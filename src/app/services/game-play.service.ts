import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnswerService } from './answer.service';
import { Answer } from '../models/answer';
import { Logger } from './log.service';

interface Game {
  answer?: Answer;
  acceptedGuesses: string[];
  status: Status;
  currentGuessIdx: number;
  currentGuess: string;
}

enum Status {
  playing,
  won,
  lost
}

const emptyGame: Game = {
  answer: undefined,
  acceptedGuesses: [],
  status: Status.playing,
  currentGuessIdx: 0,
  currentGuess: ''
};

@Injectable({
  providedIn: 'root'
})
export class GamePlayService {
  private readonly game$ = new BehaviorSubject<Game>(emptyGame);
  private log = new Logger();
  constructor(private answerService: AnswerService) { this.startNewGame() }

  public readonly currentGuess$: Observable<string> = this.game$.pipe(
    map(game => game.currentGuess)
  )
  public readonly acceptedGuesses$: Observable<string[]> = this.game$.pipe(
    map(game => game.acceptedGuesses)
  )
  public readonly currentGuessIdx$: Observable<number> = this.game$.pipe(
    map(game => game.currentGuessIdx)
  )
  public readonly answer$: Observable<Answer> = this.game$.pipe(
    map(game => game.answer!)
  )

  protected get game() {
    return this.game$.getValue();
  }

  public addLetter(letter: string) {
    if (this.game.currentGuess.length === 5) return;

    this.game$.next({
      ...this.game,
      currentGuess: this.game.currentGuess + letter
    });
  }

  public removeLetter() {
    if (this.game.currentGuess.length === 0) return;

    this.game$.next({
      ...this.game,
      currentGuess: this.game.currentGuess.substring(0, this.game.currentGuess.length - 1)
    });
  }

  public submitGuess() {
    if (this.game.currentGuess.length < 5) return;
    const { acceptedGuesses, currentGuess, currentGuessIdx } = this.game;

    this.game$.next({
      ...this.game,
      acceptedGuesses: [...acceptedGuesses, currentGuess],
      currentGuessIdx: currentGuessIdx + 1,
      currentGuess: ''
    })
  }

  public startNewGame(): void {
    this.log.info(`Starting new game...`)
    this.setAnswer();
  }

  private setAnswer(): void {
    this.answerService.getAnswer()
      .subscribe(answer => {
        this.game$.next({
          ...this.game,
          answer: answer
        })
      });
  }
}
