import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnswerService } from './answer.service';
import { Answer } from '../models/answer';

interface Game {
  answer: Answer;
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
  answer: <Answer>{},
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
    let updatedGuess = this.game.currentGuess + letter

    this.game$.next({
      ...this.game,
      currentGuess: updatedGuess
    });
  }

  public removeLetter() {
    if (this.game.currentGuess.length === 0) return;
    let { currentGuess } = this.game;
    let updatedGuess = currentGuess.substring(0, currentGuess.length - 1);

    this.game$.next({
      ...this.game,
      currentGuess: updatedGuess
    });
  }

  public submitGuess() {
    if (this.game.currentGuess.length < 5) return;
    let { acceptedGuesses, currentGuess, currentGuessIdx } = this.game;
    let updatedGuesses = [...acceptedGuesses, currentGuess];
    let updatedIdx = currentGuessIdx += 1;

    this.game$.next({
      ...this.game,
      acceptedGuesses: updatedGuesses,
      currentGuessIdx: updatedIdx,
      currentGuess: ''
    });
  }

  private startNewGame(): void {
    this.setAnswer;
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
