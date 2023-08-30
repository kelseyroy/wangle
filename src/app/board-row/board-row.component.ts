import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.scss']
})
export class BoardRowComponent {
  @Input() public guess!: string;
  @Input() public rowIdx!: number;

  public getLetters(guess: string): string[] {
    const letters = ["", "", "", "", ""];

    if (!guess || guess === '') return letters;

    guess.split("").forEach((letter, idx) => {
      letters[idx] = letter;
    })
    return letters;
  }
}
