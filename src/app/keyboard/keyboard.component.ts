import { Component } from '@angular/core';

import { KEYS } from '../models/keys';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  protected keys = KEYS;

}
