import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { GameApiService } from '../game-api.service';

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
  data!: Game[]
  scores$!: Observable<Game[]> //nos scores et utilisateurs
  pages!: number[]
  currentPage: number = 1
  configElementPage: number = 5
  constructor(private service: GameApiService) {
    this.scores$ = this.service.getGamesRanks()
    this.service.getGamesRanks().subscribe(res => {
      var scoresArray = res
      var numberOfScores = scoresArray.length
      this.pages = []; var i = 1; while (this.pages.push(i++) < numberOfScores / this.configElementPage);
    })
}
  
  clicScoreList$!: Observable<any[]> //tableau qui sert à laffichage des clics d'une partie

  ngOnInit(): void {
    
  }

  showClicks(id:number) { //affichage des clics de la partie selectionnée
    this.clicScoreList$ = this.service.getCurrentGamesSorted(id)
  }
  thisPage(page: number) {
    this.currentPage = page
  }
}
