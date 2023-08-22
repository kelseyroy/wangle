import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent {
  @Input() public key!: string;
  @Output() keyClick = new EventEmitter<string>();

  protected largeButton(): boolean {
    return this.key === 'ENTER' || this.key === 'DELETE';
  }

  public onKeyClick() {
    this.keyClick.emit(this.key);
  }
}
