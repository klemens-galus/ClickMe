import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, Click } from 'src/app/interfaces/typeInterfaces'
import { GameApiService } from 'src/app/services/gameApi/game-api.service';
import * as configuration from 'src/assets/configuration.json';


@Component({
  selector: 'app-tab-score',
  templateUrl: './tab-score.component.html',
  styleUrls: ['./tab-score.component.css']
})
export class TabScoreComponent implements OnInit {

  @Input() public user!: string | null

  public currentPage: number = 1
  public scores$!: Observable<Game[]> //nos scores et utilisateurs
  private _config: any = configuration; //fichier config
  public configElementPage: number = this._config.maxResultByPage //recupération de la configuration
  public gameId!: number
  public pages!: number[] //Aide a la creation des boutons de pages

  constructor(private _service: GameApiService) { }

  ngOnInit(): void { //On va aussi réutilser le tabscore pour la page de fin de jeu on a 2 "configurations" un sans joueur et un avec 
    if (this.user == null) {
      this.scores$ = this._service.getGamesRanks() //récupération de tous les scores triés
      this._service.getGamesRanks().subscribe(res => { //permet de compter le nombre de scores pour générer le bon nombre de pages
        let scoresArray = res
        let numberOfScores = scoresArray.length
        this.pages = []; var i = 1; while (this.pages.push(i++) < numberOfScores / this.configElementPage);
      })
    } else {
      this.scores$ = this._service.getGamesRanksByName(this.user)
      this._service.getGamesRanksByName(this.user).subscribe(res => { //permet de compter le nombre de scores pour générer le bon nombre de pages
        let scoresArray = res
        let numberOfScores = scoresArray.length
        this.pages = []; var i = 1; while (this.pages.push(i++) < numberOfScores / this.configElementPage);
      })
    }

  }
  public showClicks(id:number):void {
    this.gameId = id
  }

  public thisPage(page: number): void { //pour le changement de page
    this.currentPage = page
  }

}
