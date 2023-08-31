import { Component } from '@angular/core';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public readonly numOfRows: number = 6;
  constructor(protected readonly gameplayService: GamePlayService) { }
}
