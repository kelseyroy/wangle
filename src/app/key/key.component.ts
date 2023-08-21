import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent {
  @Input() key!: string;

  protected largeButton(): boolean {
    return this.key === 'ENTER' || this.key === 'DELETE';
  }
}
