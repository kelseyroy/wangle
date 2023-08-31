import { Component, Input } from '@angular/core';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss']
})
export class BoardTileComponent {
  @Input() public letter!: string;
  @Input() public rowIdx!: number;
  @Input() public tileIdx!: number;

  constructor(protected readonly gameplayService: GamePlayService) { }
}
