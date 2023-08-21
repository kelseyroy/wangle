import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private gameplayService: GamePlayService) { }
  protected currentGuess = '';
  protected acceptedGuesses: string[] = []
  protected currentGuess$?: Subscription;
  protected acceptedGuesses$?: Subscription;

  ngOnInit(): void {
    this.currentGuess$ = this.gameplayService.currentGuess$.subscribe(currentGuess => this.currentGuess = currentGuess);
    this.acceptedGuesses$ = this.gameplayService.acceptedGuesses$.subscribe(acceptedGuesses => this.acceptedGuesses = acceptedGuesses);
  }

  ngOnDestroy() {
    this.currentGuess$?.unsubscribe();
    this.acceptedGuesses$?.unsubscribe();
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const backspace = 'Backspace';
    const enter = 'Enter';

    if (key === backspace) this.gameplayService.removeLetter();
    if (alphabet.includes(key)) this.gameplayService.addLetter(key.toUpperCase());
    if (key === enter) this.gameplayService.submitGuess();
  }
}
