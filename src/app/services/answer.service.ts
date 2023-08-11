import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Answer } from '../models/answer';
import { ANSWERS } from '../mock-data/mock-answers';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private readonly _randomId: number = Math.floor(Math.random() * 10) + 1;

  getAnswer(): Observable<Answer> {
    const answers = from(ANSWERS);
    return answers.pipe(
      filter(answer => answer.id === this._randomId)
    )
  }
}
