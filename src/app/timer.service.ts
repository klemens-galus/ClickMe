import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { last, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public readonly timer$: Observable<number>;
  private readonly _start$: Subject<void>;
  private readonly _stop$: Subject<void>;

  constructor() {
    this._start$ = new Subject<void>();
    this._stop$ = new Subject<void>();

    this.timer$ = this._start$.pipe(
      switchMap((): Observable<number> => interval(1).pipe(
        takeUntil(this._stop$),
        last(),
      )),
    );
  }
  public start(): void {
    console.log("start")

    this._start$.next();
  }
  public stop(): void {
    console.log("stop")
    this._stop$.next();
  }
}
