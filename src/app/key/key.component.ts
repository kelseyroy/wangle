import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, distinctUntilChanged, map } from 'rxjs';

import { GamePlayService } from '../services/game-play.service';
import { KeyScore } from '../models/key-score';

export enum KeyColor {
  darkGrey = 'dark-grey',
  lightGrey = 'light-grey',
  green = 'green',
  yellow = 'yellow'
}

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  public keyColor$!: Observable<KeyColor>;

  @Input() public key!: string;
  @Output() keyClick = new EventEmitter<string>();

  constructor(protected readonly gameplayService: GamePlayService) { }

  ngOnInit(): void {
    this.keyColor$ = this.gameplayService.evaluateKey$(this.key).pipe(
      distinctUntilChanged(),
      map(val => {
        if (val === KeyScore.notInWord) return KeyColor.darkGrey;
        if (val === KeyScore.inWord) return KeyColor.yellow;
        if (val === KeyScore.correct) return KeyColor.green;

        return KeyColor.lightGrey;
      })
    )
  }

  protected isLargeButton(key: string): boolean {
    return key === 'ENTER' || key === 'DELETE';
  }

  public onKeyClick(key: string) {
    this.keyClick.emit(key);
  }
}
