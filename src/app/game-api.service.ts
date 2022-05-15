import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export interface Game {
  bestTime: number;
  MoyTime: number;
  Pseudo: string;
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
  constructor(private http: HttpClient) { }

  getGamesRanks(): Observable<Game[]> {//Récupération de la base de donnée GAMEH trié via une map 
    return this.http.get<Game[]>(this.gameApiUrl + '/GAMEHs').pipe(
      map((scores: Game[]): Game[] => scores.sort((n1: Game, n2: Game): number => n1.bestTime - n2.bestTime))
    );
  }
  addGameRanks(data: any) {
    return this.http.post(this.gameApiUrl + '/GAMEHs',data);
  }
  updateGameRanks(id: number, data: any) {
    return this.http.put(this.gameApiUrl + `/GAMEHs/${id}`, data);
  }

  getCurrentGames(): Observable<any[]> {//Récupération de la base de donnée GAMED
    return this.http.get<any>(this.gameApiUrl + '/GAMEDs');
  }

  addCurrentGames(data: any) {
    return this.http.post(this.gameApiUrl + '/GAMEDs', data);
  } 

  getCurrentGamesSorted(gameId:number): Observable<Clicks[]> {
    return this.http.get<Clicks[]>(this.gameApiUrl + '/GAMEDs').pipe(
      map((scores: Clicks[]): Clicks[] => scores.sort((n1: Clicks, n2: Clicks): number => n1.clickNumber - n2.clickNumber)), map((scores: Clicks[]): Clicks[] => scores.filter(
        (item: Clicks): boolean => item.gameId === gameId))
    )
  }
}
