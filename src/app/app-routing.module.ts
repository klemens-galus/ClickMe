import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClickmeComponent } from "./clickme/clickme.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NamePageComponent } from "./name-page/name-page.component";
import { ScoreComponent } from "./score/score.component";

const routes: Routes = [
  { path: 'game', component: ClickmeComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'setname', component: NamePageComponent },
  { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{ }
