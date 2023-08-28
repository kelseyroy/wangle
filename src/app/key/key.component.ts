import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, map, } from 'rxjs';

import { GamePlayService } from '../services/game-play.service';
import { KeyScore } from '../models/key-score';

enum KeyColor {
  darkGrey = '#787c7f',
  lightGrey = '#EFEFEF',
  green = '#6ca965',
  yellow = '#c8b653'
}

// enum KeyColor {
//   darkGrey = 'dark-grey',
//   lightGrey = 'light-grey',
//   green = 'green',
//   yellow = 'yellow'
// }

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  protected keyColor$!: Observable<KeyColor>;
  @Input() public key!: string;
  @Output() keyClick = new EventEmitter<string>();

  constructor(protected readonly gameplayService: GamePlayService) { }

  ngOnInit(): void {
    // see src/app/services/game-play.service.ts to see evaluateKey$
    this.keyColor$ = this.gameplayService.evaluateKey$(this.key).pipe(
        map(val => {
          if (val === KeyScore.notInWord) return KeyColor.darkGrey;
          if (val === KeyScore.inWord) return KeyColor.yellow;
          if (val === KeyScore.correct) return KeyColor.green;
          return KeyColor.lightGrey;
        })
      )
  }

  protected isLargeButton(key: string) {
    return key === 'ENTER' || key === 'DELETE' ? 'large-btn' : 'small-btn';
  }

  public onKeyClick(key: string) {
    this.keyClick.emit(key);
  }
}
