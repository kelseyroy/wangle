import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Answer } from '../models/answer';
import { ANSWERS } from '../mock-data/mock-answers';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor() { }
  getAnswers(): Observable<Answer[]> {
    const answers = of(ANSWERS);
    return answers;
  }
}
