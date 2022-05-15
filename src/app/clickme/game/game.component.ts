import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Game, GameApiService } from '../../game-api.service';
import { TimerService } from '../../timer.service';

export interface Click {
  clickNumber: number,
  time: number,
  gameId: number
}
const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {


  constructor(private router: Router, private service: GameApiService, private timerService: TimerService) { }

  ConfigMaxClick:number = 10;
  imageX!: number;
  imageY!: number;
  clickCount: number = 0;
  bestTime: number = 999;
  CurrentClick: number =0;
  firstOne: boolean = true;
  totalTime: number = 0;
  clickList: Array<Click> = []
  gameId!: number;

  ngOnInit(): void {

    this.generateTarget();
    if (sessionStorage.getItem('name') == null) {
      this.router.navigate(['/setname'])
    }
  }

  generateTarget() { //Cree de nouvelle coordonées a notre cible 
    this.imageX = Math.round(Math.random() * (window.innerWidth - 60)) //-180 pour que l'image ne sorte pas du navigateur
    this.imageY = Math.round(Math.random() * (window.innerHeight - 60))
    var target = document.getElementById('target')
    target?.setAttribute("style", "left:" + this.imageX + "px; top:" + this.imageY + "px")
    var progressBar = document.getElementById('progressBarGame')
    progressBar?.setAttribute("style", "width:" + this.clickCount / this.ConfigMaxClick * 100 + "%")

  }
  clickCombo() {
    this.timerService.stop();
    this.generateTarget();
    this.timerService.timer$.subscribe(res => {
      this.CurrentClick = res;
      console.log(this.CurrentClick)
    })
    if (this.clickCount >= 1) {  //On va commencer a compter les temps à partir du second clic
      this.addClick();
      this.totalTime += this.CurrentClick
      if (this.CurrentClick < this.bestTime) {
        this.bestTime = this.CurrentClick
      }
    }
    if( this.clickCount >= 10 ){
      this.sendScore()
    }
    this.clickCount++
    this.timerService.start();
    
  }

  sendScore() {
    console.log(this.clickList)
    var game = {
      pseudo: sessionStorage.getItem('name'),
      bestTime: this.bestTime,
      moyTime: Math.round(this.totalTime / this.ConfigMaxClick)
    }
    this.service.addGameRanks(game).subscribe(ret => {
      var retour: any = ret
      this.gameId = retour.id
      console.log(this.gameId)
      for (var element of this.clickList) {
        element.gameId = this.gameId;
        this.service.addCurrentGames(element).subscribe({})
        this.router.navigate(['/score'])
      }
    })
    
  }

  addClick() {/*
    var click = {
      gameId: this.gameId,
      clickNumber: this.clickCount,
      time: this.CurrentClick
    }
    this.service.addCurrentGames(click).subscribe(res => {
      console.log(res)
    })*/
    var addThisClick: Click = {gameId: -1, clickNumber: this.clickCount, time: this.CurrentClick }
    this.clickList.push(addThisClick)

  }

  
}
