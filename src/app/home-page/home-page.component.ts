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

  goGame() {
    this._router.navigate(['/game'])
  }
  goScore() {
    this._router.navigate(['/score'])
  }
  goDisc() {
    sessionStorage.clear();
  }
  goSetName() {
    this._router.navigate(['/setname'])
  }
}
