import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Game, GameApiService } from '../../game-api.service';
import { TimerService } from '../../timer.service';
import * as configuration from '../../../../configuration.json';

export interface Click { 
  clickNumber: number,
  time: number,
  gameId: number
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {


  constructor(private _router: Router, private _service: GameApiService, private _timerService: TimerService) { }
  config: any = configuration //fichier config
  ConfigMaxClick: number = this.config.NumberOfTarget; //récupération de la configuration
  clickCount: number = 0; //Permet de calculer le nombre de clic
  bestTime: number = 999; //Meilleur temps entre 2 clic
  CurrentClick: number =0; //Temps du dernier clic
  firstOne: boolean = true; //Correspond au premier clic (pour éviter de le comptabiliser)
  totalTime: number = 0; //temps total de la partie
  clickList: Array<Click> = [] //liste de tout les clics
  gameId!: number; //Id de la partie (pour la sauvegarde des clics)

  ngOnInit(): void {
    confirm("Vous devez cliquer sur " + this.ConfigMaxClick + " cibles (cliquer sur la première pour commencer)") //Alerte pour donner le nombre de cibles a cliquer
    this.generateTarget(); 
    if (sessionStorage.getItem('name') == null) { //Si il ny a pas de session pour l'utilisateur on le revoie cree une session
      this._router.navigate(['/setname'])
    }
  }

  generateTarget() { //Cree de nouvelle coordonées a notre cible 
    let imageX = Math.round(Math.random() * (window.innerWidth - 60)) //-180 pour que l'image ne sorte pas du navigateur
    let imageY = Math.round(Math.random() * (window.innerHeight - 60))
    //Va nous permettre de cree une cible aléatoire
    let target = document.getElementById('target') 
    target?.setAttribute("style", "left:" + imageX + "px; top:" + imageY + "px")
    //Permet de faire changer la barre de progression
    let progressBar = document.getElementById('progressBarGame')
    progressBar?.setAttribute("style", "width:" + this.clickCount / this.ConfigMaxClick * 100 + "%")

  }
  clickCombo() { //Chaque clic va appeler cette méthode 
    this._timerService.stop(); 
    this.generateTarget(); //On regenère une cible
    this._timerService.timer$.subscribe(res => { //récupération du temps
      this.CurrentClick = res;
    })
    if (this.clickCount >= 1) {  //On va commencer a compter les temps à partir du second clic
      this.addClick(); //Ajout du clic à notre tableau
      this.totalTime += this.CurrentClick
      if (this.CurrentClick < this.bestTime) {
        this.bestTime = this.CurrentClick
      }
    }
    if (this.clickCount >= this.ConfigMaxClick ){ //condition d'arrêt
      this.sendScore()
    }
    this.clickCount++
    this._timerService.start();
    
  }

  sendScore() { //Ajout des scores / clics à la base de donné 
    let game = {
      pseudo: sessionStorage.getItem('name'),
      bestTime: this.bestTime,
      moyTime: Math.round(this.totalTime / this.ConfigMaxClick)
    }
    this._service.addGameRanks(game).subscribe(ret => {
      var retour: any = ret
      this.gameId = retour.id
      console.log(this.gameId)
      for (var element of this.clickList) {
        element.gameId = this.gameId;
        this._service.addCurrentGames(element).subscribe({})
        this._router.navigate(['/endgame', this.gameId])
      }
    })
    
  }

  addClick() { //Ajout d'un clic à la liste
    let addThisClick: Click = {gameId: -1, clickNumber: this.clickCount, time: this.CurrentClick }
    this.clickList.push(addThisClick)

  }

  
}
