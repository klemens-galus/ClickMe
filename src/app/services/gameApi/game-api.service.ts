import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Game, Click } from 'src/app/interfaces/typeInterfaces'


@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  readonly gameApiUrl = "https://localhost:7047/api"
  constructor(private _http: HttpClient) { }

  public getGamesRanks(): Observable<Game[]> {//Récupération de la base de donnée GAMEH trié via une map 
    return this._http.get<Game[]>(this.gameApiUrl + '/GAMEHs').pipe(
      map((scores: Game[]): Game[] => scores.sort((n1: Game, n2: Game): number => n1.moyTime - n2.moyTime))
    );
  }
  public getGamesRanksById(id:number): Observable<Game> {
    return this._http.get<Game>(this.gameApiUrl + '/GAMEHs/' + id);
  }
  public getGamesRanksByName(user: string|null): Observable<Game[]> {//Tri plus selection de l'historique des clics par rapport à l'id de la partie
    return this._http.get<Game[]>(this.gameApiUrl + '/GAMEHs').pipe(
      map((scores: Game[]): Game[] => scores.sort((n1: Game, n2: Game): number => n1.moyTime - n2.moyTime)), map((scores: Game[]): Game[] => scores.filter(
        (item: Game): boolean => item.pseudo === user))
    )
  }

  public addGameRanks(data: any): Observable<Object>{
    return this._http.post(this.gameApiUrl + '/GAMEHs',data);
  }

  public getCurrentGames(): Observable<Click[]> {//Récupération de la base de donnée GAMED
    return this._http.get<Click[]>(this.gameApiUrl + '/GAMEDs');
  }

  public addCurrentGames(data: Click): Observable<Object> {
    return this._http.post(this.gameApiUrl + '/GAMEDs', data);
  } 

  public getCurrentGamesSorted(gameId: number): Observable<Click[]> {//Tri plus selection de l'historique des clics par rapport à l'id de la partie
    return this._http.get<Click[]>(this.gameApiUrl + '/GAMEDs').pipe(
      map((scores: Click[]): Click[] => scores.sort((n1: Click, n2: Click): number => n1.clickNumber - n2.clickNumber)), map((scores: Click[]): Click[] => scores.filter(
        (item: Click): boolean => item.gameId === gameId))
    )
  }


}
