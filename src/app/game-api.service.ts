import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export interface Game {
  bestTime: number;
  moyTime: number;
  pseudo: string;
  id: number;
}

export interface Clicks{
  time: number;
  gameId: number;
  clickNumber: number;
  id: number;
}


@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  readonly gameApiUrl = "https://localhost:7047/api"
  constructor(private _http: HttpClient) { }

  getGamesRanks(): Observable<Game[]> {//Récupération de la base de donnée GAMEH trié via une map 
    return this._http.get<Game[]>(this.gameApiUrl + '/GAMEHs').pipe(
      map((scores: Game[]): Game[] => scores.sort((n1: Game, n2: Game): number => n1.moyTime - n2.moyTime))
    );
  }
  getGamesRanksById(id:number): Observable<Game> {
    return this._http.get<Game>(this.gameApiUrl + '/GAMEHs/' + id);
  }
  getGamesRanksByName(user: string|null): Observable<Game[]> {//Tri plus selection de l'historique des clics par rapport à l'id de la partie
    return this._http.get<Game[]>(this.gameApiUrl + '/GAMEHs').pipe(
      map((scores: Game[]): Game[] => scores.sort((n1: Game, n2: Game): number => n1.moyTime - n2.moyTime)), map((scores: Game[]): Game[] => scores.filter(
        (item: Game): boolean => item.pseudo === user))
    )
  }

  addGameRanks(data: any) {
    return this._http.post(this.gameApiUrl + '/GAMEHs',data);
  }

  getCurrentGames(): Observable<any[]> {//Récupération de la base de donnée GAMED
    return this._http.get<any>(this.gameApiUrl + '/GAMEDs');
  }

  addCurrentGames(data: any) {
    return this._http.post(this.gameApiUrl + '/GAMEDs', data);
  } 

  getCurrentGamesSorted(gameId:number): Observable<Clicks[]> {//Tri plus selection de l'historique des clics par rapport à l'id de la partie
    return this._http.get<Clicks[]>(this.gameApiUrl + '/GAMEDs').pipe(
      map((scores: Clicks[]): Clicks[] => scores.sort((n1: Clicks, n2: Clicks): number => n1.clickNumber - n2.clickNumber)), map((scores: Clicks[]): Clicks[] => scores.filter(
        (item: Clicks): boolean => item.gameId === gameId))
    )
  }


}
