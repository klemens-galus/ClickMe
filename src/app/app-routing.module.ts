import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClickmeComponent } from "src/app/pages/clickme/clickme.component";
import { HomePageComponent } from "src/app/pages/home-page/home-page.component";
import { NamePageComponent } from "src/app/pages/name-page/name-page.component";
import { ScoreComponent } from "src/app/pages/score/score.component";
import { EndComponent } from "src/app/pages/end/end.component"

const routes: Routes = [
  { path: 'game', component: ClickmeComponent },
  { path: 'endgame/:id', component: EndComponent },
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
