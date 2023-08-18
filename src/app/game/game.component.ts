import { Component, HostListener, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.gameplayService.currentGuess$.subscribe(currentGuess => this.currentGuess = currentGuess);
    this.gameplayService.acceptedGuesses$.subscribe(acceptedGuesses => this.acceptedGuesses = acceptedGuesses)
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
