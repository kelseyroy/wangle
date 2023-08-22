import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
  private readonly log = new Logger();

  constructor(private readonly http: HttpClient) { }

  getAnswer(): Observable<Answer> {
    return this.http.get<Answer>(this.answerUrl).pipe(
      tap(() => this.log.info('fetched answer')),
      catchError((err: Error) => {
        this.log.error(`getAnswer failed: ${err.message}`);
        return throwError(() => err);
      }));
  }
}
