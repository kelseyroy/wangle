import { Component, ViewChild, ElementRef } from '@angular/core';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-game-over-modal',
  templateUrl: './game-over-modal.component.html',
  styleUrls: ['./game-over-modal.component.scss']
})
export class GameOverModalComponent {
  constructor(protected readonly gameplayService: GamePlayService) { }
}
