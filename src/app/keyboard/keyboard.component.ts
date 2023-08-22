import { Component, Output, EventEmitter } from '@angular/core';

import { KEYS } from '../models/keys';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  protected readonly keys = KEYS;
  @Output() keyBoardClick = new EventEmitter<string>();

  public onKeyBoardClick(letter: string) {
    this.keyBoardClick.emit(letter);
  }
}
