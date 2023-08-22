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
    this.handleKeyEvents(event.key);
  }

  public handleKeyEvents(key: string) {
    const formattedKey = key.toUpperCase();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (formattedKey === 'BACKSPACE' || formattedKey === 'DELETE') this.gameplayService.removeLetter();
    if (alphabet.includes(formattedKey)) this.gameplayService.addLetter(key.toUpperCase());
    if (formattedKey === 'ENTER') this.gameplayService.submitGuess();
  }
}
