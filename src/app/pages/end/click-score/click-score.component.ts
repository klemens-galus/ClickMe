import { Component, OnInit, Input } from '@angular/core';
import { GameApiService } from 'src/app/services/gameApi/game-api.service';
import { Game, Click } from 'src/app/interfaces/typeInterfaces'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-click-score',
  templateUrl: './click-score.component.html',
  styleUrls: ['./click-score.component.css']
})
export class ClickScoreComponent implements OnInit {

  public lastGameClicks$!: Observable<Click[]>
  public lastGame$!: Observable<Game>

  @Input() id!:number
  constructor(private _service: GameApiService) { }

  ngOnInit(): void {
    this.lastGame$ = this._service.getGamesRanksById(this.id)
    setTimeout(() => { //par moment les clics ne s'affichent pas tous ici on va les recharger juste après le chargement de la page
      this.lastGameClicks$ = this._service.getCurrentGamesSorted(this.id)
    }, 100)
  }

}
