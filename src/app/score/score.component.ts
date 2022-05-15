import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameApiService } from '../game-api.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit {

  scores$!: Observable<any>


  constructor(private service: GameApiService) {}
  
  clicScoreList$!: Observable<any[]>

  ngOnInit(): void {
    this.scores$ = this.service.getGamesRanks();
  }

  showClicks(id:number) {
    this.clicScoreList$ = this.service.getCurrentGamesSorted(id)
  }
}
