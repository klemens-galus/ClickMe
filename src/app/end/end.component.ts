import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../game-api.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';


export interface Game {
  bestTime: number;
  moyTime: number;
  pseudo: string;
  id: number;
}
export interface Clicks {
  time: number;
  gameId: number;
  clickNumber: number;
  id: number;
}


@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})


export class EndComponent implements OnInit {
  scores$!: Observable<Game[]> //score de l'utilisateur
  lastGameClicks$!: Observable<Clicks[]>
  lastGame$!: Observable<any>
  
  id!:number
  constructor(private service: GameApiService, private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.scores$ = this.service.getGamesRanksByName(sessionStorage.getItem('name'))
    var stringId: string | null = this.route.snapshot.paramMap.get('id')
    this.id = parseInt(stringId!);
    this.lastGame$ = this.service.getGamesRanksById(this.id)
    setTimeout(() => { //par moment les clics ne s'affichent pas tous ici on va les recharger juste après le chargement de la page
      this.lastGameClicks$ = this.service.getCurrentGamesSorted(this.id)
    }, 100)
  }
  clicScoreList$!: Observable<any>
  showClicks(id: number) { //affichage des clics de la partie selectionnée
    this.clicScoreList$ = this.service.getCurrentGamesSorted(id)
  }
}
