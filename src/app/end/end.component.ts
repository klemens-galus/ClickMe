import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../game-api.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private _service: GameApiService, private _route: ActivatedRoute, private _router: Router) {
    
  }
  ngOnInit(): void {
    this.scores$ = this._service.getGamesRanksByName(sessionStorage.getItem('name'))
    let stringId: string | null = this._route.snapshot.paramMap.get('id')
    this.id = parseInt(stringId!);
    this.lastGame$ = this._service.getGamesRanksById(this.id)
    setTimeout(() => { //par moment les clics ne s'affichent pas tous ici on va les recharger juste après le chargement de la page
      this.lastGameClicks$ = this._service.getCurrentGamesSorted(this.id)
    }, 100)
  }
  clicScoreList$!: Observable<any>
  showClicks(id: number) { //affichage des clics de la partie selectionnée
    this.clicScoreList$ = this._service.getCurrentGamesSorted(id)
  }
  goHome() {
    this._router.navigate(['/'])
  }
}
