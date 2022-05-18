import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Pos } from 'src/app/interfaces/typeInterfaces'


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnChanges {

  @Input() //Coordonées de la cible
  public imagePos!: Pos
  @Output() //Event pour annoncer le clic de la cible
  public clickTargetEvent = new EventEmitter<void>();

  constructor() { }

  ngOnChanges(): void {
    let target = document.getElementById('target') 
    target?.setAttribute("style", "left:" + this.imagePos.x + "px; top:" + this.imagePos.y + "px")
  }
  public clickCombo():void {
    this.clickTargetEvent.emit();
  }
  
}
