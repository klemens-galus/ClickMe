import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public goGame(): void {
    this._router.navigate(['/game'])
  }
  public goScore(): void {
    this._router.navigate(['/score'])
  }
  public goDisc(): void {
    sessionStorage.clear();
  }
  public goSetName(): void {
    this._router.navigate(['/setname'])
  }
}
