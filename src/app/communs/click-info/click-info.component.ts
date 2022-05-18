import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GameApiService } from 'src/app/services/gameApi/game-api.service';
import { Click } from 'src/app/interfaces/typeInterfaces'

@Component({
  selector: 'app-click-info',
  templateUrl: './click-info.component.html',
  styleUrls: ['./click-info.component.css']
})
export class ClickInfoComponent implements OnChanges {

  constructor(private _service: GameApiService) { }

  @Input() public idGame: number = 0
  public clicScoreList$!: Observable<Click[]> //tableau qui sert à l'affichage des clics d'une partie

  ngOnChanges(): void {
    this.clicScoreList$ = this._service.getCurrentGamesSorted(this.idGame)
  }
    
}
