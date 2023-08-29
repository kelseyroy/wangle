import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { GamePlayService } from '../services/game-play.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  public buttonSize!: string;

  @Input() public key!: string;
  @Output() keyClick = new EventEmitter<string>();

  constructor(protected readonly gameplayService: GamePlayService) { }

  ngOnInit(): void {
    this.buttonSize = this.key === 'ENTER' || this.key === 'DELETE' ? 'large-btn' : 'small-btn';
  }

  public onKeyClick(key: string) {
    this.keyClick.emit(key);
  }
}
