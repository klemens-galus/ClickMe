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

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})


export class EndComponent implements OnInit {
  scores$!: Observable<Game[]> //score de l'utilisateur
  lastGameClicks$!: Observable<any[]>
  lastGame$!: Observable<any>
  id!:number
  constructor(private service: GameApiService, private route: ActivatedRoute) {
    this.scores$ = this.service.getGamesRanksByName(sessionStorage.getItem('name'))
    var stringId: string | null = this.route.snapshot.paramMap.get('id')
    this.id = parseInt(stringId!);
    this.lastGameClicks$ = this.service.getCurrentGamesSorted(this.id)
    this.lastGame$ = this.service.getGamesRanksById(this.id)
  }
  ngOnInit(): void {}

}
