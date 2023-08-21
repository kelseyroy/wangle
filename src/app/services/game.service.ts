import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Logger } from './log.service';

import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gamesUrl = `api/games`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private log = new Logger;

  constructor(private http: HttpClient) { }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, this.httpOptions).pipe(
      tap((newGame: Game) => this.log.info(`added hero w/ id=${newGame.id}`)),
      catchError((err: Error) => {
        this.log.error(`addGame failed: ${err.message}`);
        return throwError(() => err);
      }));
  }

  getGames(): Observable<Game> {
    return this.http.get<Game>(this.gamesUrl).pipe(
      tap(() => this.log.info('fetched games')),
      catchError((err: Error) => {
        this.log.error(`getGames failed: ${err.message}`);
        return throwError(() => err);
      }))
  }
}
