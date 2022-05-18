import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClickmeComponent } from 'src/app/pages/clickme/clickme.component';
import { GameComponent } from 'src/app/pages/clickme/game/game.component';
import { ScoreComponent } from 'src/app/pages/score/score.component';
import { NamePageComponent } from 'src/app/pages/name-page/name-page.component';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EndComponent } from 'src/app/pages/end/end.component';
import { TabScoreComponent } from 'src/app/communs/tab-score/tab-score.component';
import { ClickInfoComponent } from 'src/app/communs/click-info/click-info.component';
import { ClickScoreComponent } from './pages/end/click-score/click-score.component'

@NgModule({
  declarations: [
    AppComponent,
    ClickmeComponent,
    GameComponent,
    ScoreComponent,
    TabScoreComponent,
    NamePageComponent,
    HomePageComponent,
    EndComponent,
    ClickInfoComponent,
    ClickScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
