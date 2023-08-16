import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Answer } from '../models/answer';
import { ANSWERS } from '../mock-data/mock-answers';
import { GAMES } from '../mock-data/mock-games';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const answers = ANSWERS;
    const games = GAMES;
    return { answers, games };
  }

  genId(answers: Answer[]): number {
    return answers.length > 0 ? Math.max(...answers.map(answer => answer.id)) + 1 : 11;
  }
}