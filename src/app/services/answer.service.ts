import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Answer } from '../models/answer';
import { Logger } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private readonly _randomId: number = Math.floor(Math.random() * 10) + 1;
  private readonly answerUrl = `api/answers/${this._randomId}`;
  private log = new Logger();

  constructor(private http: HttpClient) { }

  getAnswer(): Observable<Answer> {
    return this.http.get<Answer>(this.answerUrl).pipe(
      tap(() => this.log.info('fetched answer')),
      catchError(err => {
        this.log.error(`getAnswer failed: ${err.message}`);
        return of(<Answer>{ id: 1, word: 'ADEPT' });
      }));
  }
}
