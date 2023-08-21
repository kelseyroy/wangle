import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnswerService } from './answer.service';
import { Answer } from '../models/answer';

interface Game {
  answer?: Answer;
  acceptedGuesses: string[];
  status: Status;
  currentGuessIdx: number;
  currentGuess: string;
};

enum Status {
  playing,
  won,
  lost
};

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
  constructor(private answerService: AnswerService) { this.startNewGame() }

  public readonly currentGuess$ = this.game$.pipe(
    map(game => game.currentGuess)
  )
  public readonly acceptedGuesses$ = this.game$.pipe(
    map(game => game.acceptedGuesses)
  )
  public readonly currentGuessIdx$ = this.game$.pipe(
    map(game => game.currentGuessIdx)
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
    });
  }

  private startNewGame(): void {
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
