import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GameApiService } from 'src/app/services/gameApi/game-api.service';
import { TimerService } from 'src/app/services/timeApi/timer.service';
import * as configuration from 'src/assets/configuration.json';
import { Click, Pos } from 'src/app/interfaces/typeInterfaces'


@Component({
  selector: 'app-clickme',
  templateUrl: './clickme.component.html',
  styleUrls: ['./clickme.component.css'],
})
export class ClickmeComponent implements OnInit {


  constructor(private _router: Router, private _service: GameApiService, private _timerService: TimerService) { }

  public posImage!: Pos;

  private _config: any = configuration //fichier config
  private _ConfigMaxClick: number = this._config.NumberOfTarget; //Récupération de la configuration
  private _clickCount: number = 0; //Permet de calculer le nombre de clics
  private _bestTime: number = 999; //Meilleur temps entre 2 clics
  private _CurrentClick: number = 0; //Temps du dernier clic
  private _totalTime: number = 0; //temps total de la partie
  private _clickList: Array<Click> = [] //liste de tous les clics
  private _gameId!: number; //Id de la partie (pour la sauvegarde des clics)

  ngOnInit(): void {
    confirm("Vous devez cliquer sur " + this._ConfigMaxClick + " cibles (cliquer sur la première pour commencer)") //Alerte pour donner le nombre de cibles a cliqué
    this.generateTarget();
    if (sessionStorage.getItem('name') == null) { //S'il n'y n'a pas de session pour l'utilisateur, on le renvoi créer une session
      this._router.navigate(['/setname'])
    }
  }

  public generateTarget(): void { //Cree de nouvelle coordonnées a notre cible 
    let imageX = Math.round(Math.random() * (window.innerWidth - 100)) //-100 pour que l'image ne sorte pas du navigateur
    let imageY = Math.round(Math.random() * (window.innerHeight - 100))
    this.posImage = {
      x: imageX,
      y: imageY
    }
    //Permet de faire changer la barre de progression
    let progressBar = document.getElementById('progressBarGame')
    progressBar?.setAttribute("style", "width:" + this._clickCount / this._ConfigMaxClick * 100 + "%")

  }
  public clickCombo(): void { //Chaque clic va appeler cette méthode 
    this._timerService.stop();
    this.generateTarget(); //On regenère une cible
    this._timerService.timer$.subscribe(res => { //récupération du temps
      this._CurrentClick = res;
    })
    if (this._clickCount >= 1) {  //On va commencer a compter les temps à partir du second clic
      this.addClick(); //Ajout du clic à notre tableau
      this._totalTime += this._CurrentClick
      if (this._CurrentClick < this._bestTime) {
        this._bestTime = this._CurrentClick
      }
    }
    if (this._clickCount >= this._ConfigMaxClick) { //condition d'arrêt
      this.sendScore()
    }
    this._clickCount++
    this._timerService.start();

  }

  public sendScore(): void { //Ajout des scores / clics à la base de donnée
    let game = {
      pseudo: sessionStorage.getItem('name'),
      bestTime: this._bestTime,
      moyTime: Math.round(this._totalTime / this._ConfigMaxClick)
    }
    this._service.addGameRanks(game).subscribe(ret => {
      var retour: any = ret
      this._gameId = retour.id
      console.log(this._gameId)
      for (var element of this._clickList) {
        element.gameId = this._gameId;
        this._service.addCurrentGames(element).subscribe({})
        this._router.navigate(['/endgame', this._gameId])
      }
    })

  }

  public addClick(): void { //Ajout d'un clic à la liste
    let addThisClick: Click = { gameId: -1, clickNumber: this._clickCount, time: this._CurrentClick }
    this._clickList.push(addThisClick)

  }


}
