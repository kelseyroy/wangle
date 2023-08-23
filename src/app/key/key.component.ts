import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent {
  @Input() public key!: string;
  @Output() keyClick = new EventEmitter<string>();

  protected isLargeButton(key: string): boolean {
    return key === 'ENTER' || key === 'DELETE';
  }

  public onKeyClick(key: string) {
    this.keyClick.emit(key);
  }
}
