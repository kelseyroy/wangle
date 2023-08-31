import { Component, ElementRef } from '@angular/core';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-game-over-modal',
  templateUrl: './game-over-modal.component.html',
  styleUrls: ['./game-over-modal.component.scss']
})
export class GameOverModalComponent {
  private element: any;

  constructor(protected readonly gameplayService: GamePlayService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  public close() {
    this.element.style.display = 'none';
    this.element.querySelector('.go-modal').classList.remove('open');
  }
}
