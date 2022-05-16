import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { GameApiService } from '../game-api.service';
import * as configuration from '../../../configuration.json';
import { Router } from '@angular/router';


export interface Game {
  bestTime: number;
  moyTime: number;
  pseudo: string;
  id: number;
}

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})



export class ScoreComponent implements OnInit {
  config: any = configuration; //fichier config
  scores$!: Observable<Game[]> //nos scores et utilisateurs
  pages!: number[] //Aide a la creation des boutons de pages
  currentPage: number = 1 //Page des scores 
  configElementPage: number = this.config.maxResultByPage //recupération de la configuration
  constructor(private _service: GameApiService, private _router: Router) {
    this.scores$ = this._service.getGamesRanks() //récupération de tous les scores triés
    this._service.getGamesRanks().subscribe(res => { //permet de compter le nombre de scores pour générer le bon nombre de pages
      let scoresArray = res
      let numberOfScores = scoresArray.length
      this.pages = []; var i = 1; while (this.pages.push(i++) < numberOfScores / this.configElementPage);
    })
}
  
  clicScoreList$!: Observable<any[]> //tableau qui sert à l'affichage des clics d'une partie

  ngOnInit(): void {
  }

  showClicks(id:number) { //affichage des clics de la partie selectionnée
    this.clicScoreList$ = this._service.getCurrentGamesSorted(id)
  }
  thisPage(page: number) { //pour le changement de page
    this.currentPage = page
  }

  goHome() {
    this._router.navigate(['/'])
  }
}
