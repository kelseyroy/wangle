import { Component, HostListener } from '@angular/core';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  constructor(protected readonly gameplayService: GamePlayService) { }

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
