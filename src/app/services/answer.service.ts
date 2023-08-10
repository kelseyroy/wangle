import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private readonly _randomId: number = Math.floor(Math.random() * 10) + 1;
  private readonly answerUrl = `api/answers/${this._randomId}`;

  constructor(private http: HttpClient) { }

  getAnswer(): Observable<Answer> {
    return this.http.get<Answer>(this.answerUrl).pipe(
      tap(() => console.log('fetched answer')),
      catchError(err => {
        console.error(`getAnswer failed: ${err.message}`);
        return of(<Answer>{ id: 1, word: 'ADEPT' });
      }));
  }
}
