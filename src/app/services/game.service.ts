import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gamesUrl = `api/games`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, this.httpOptions).pipe(
      tap((newGame: Game) => console.log(`added hero w/ id=${newGame.id}`)),
      catchError(err => {
        console.error(`addGame failed: ${err.message}`);
        return of(<Game>{});
      })
    );
  }

  getGames(): Observable<Game> {
    return this.http.get<Game>(this.gamesUrl).pipe(
      tap(() => console.log('fetched games')),
      catchError(err => {
        console.error(`getGames failed: ${err.message}`);
        return of(<Game>{});
      }));
  }
}
