import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private gameplayService: GamePlayService) { }
  protected currentGuess: string = '';
  protected acceptedGuesses: string[] = []
  protected currentGuess$: any;
  protected acceptedGuesses$: any;

  ngOnInit(): void {
    this.currentGuess$ = this.gameplayService.currentGuess$.subscribe(currentGuess => this.currentGuess = currentGuess);
    this.acceptedGuesses$ = this.gameplayService.acceptedGuesses$.subscribe(acceptedGuesses => this.acceptedGuesses = acceptedGuesses)
  }

  ngOnDestroy() {
    this.currentGuess$.unsubscribe();
    this.acceptedGuesses$.unsubscribe();
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    let key = event.key;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const backspace = 'Backspace';
    const enter = 'Enter';

    if (key === backspace) this.gameplayService.removeLetter();
    if (alphabet.includes(key)) this.gameplayService.addLetter(key.toUpperCase());
    if (key === enter) this.gameplayService.submitGuess();
  }
}
