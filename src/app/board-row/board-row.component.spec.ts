import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BoardRowComponent } from './board-row.component';
import { BoardTileComponent } from '../board-tile/board-tile.component';

describe('BoardRowComponent', () => {
  let component: BoardRowComponent;
  let fixture: ComponentFixture<BoardRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardRowComponent,
        BoardTileComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(BoardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an array of 5 empty strings when guess does not exist', () => {
    const emptyGuess = "";
    const emptyLetters = ["", "", "", "", ""];

    expect(component.getLetters(emptyGuess)).toEqual(emptyLetters);
  });

  it('should create an array of accepted guess letters', () => {
    const acceptedGuess = "ADEPT";

    expect(component.getLetters(acceptedGuess)).toEqual(acceptedGuess.split(''));
  });
  it('should create an array of length 5 when the guess length is not 5', () => {
    const currentGuess = "HALF"
    const result = component.getLetters(currentGuess);

    expect(result.length).toEqual(5);
    expect(result).toEqual(["H", "A", "L", "F", ""]);
  });
});
