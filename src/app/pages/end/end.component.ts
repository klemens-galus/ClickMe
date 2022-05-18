import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})


export class EndComponent implements OnInit {
  public id!: number
  public gameId!: number
  public userToScore!: string | null
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.userToScore = sessionStorage.getItem('name')
    let stringId: string | null = this._route.snapshot.paramMap.get('id')
    this.id = parseInt(stringId!);

  }
  
  public showClicks(id: number): void { //affichage des clics de la partie selectionnée
    this.gameId = id

  }

  public goHome():void {
    this._router.navigate(['/'])
  }
}
