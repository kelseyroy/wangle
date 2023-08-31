import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, firstValueFrom } from 'rxjs';

import { BoardTileComponent } from './board-tile.component';
import { GamePlayService } from '../services/game-play.service';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer';
import { LetterScore } from '../models/letter-score';

const mockAnswer: Answer = { id: 1, word: 'ADEPT' };

describe('BoardTileComponent', () => {
  let component: BoardTileComponent;
  let fixture: ComponentFixture<BoardTileComponent>;
  let service: GamePlayService;
  const callAddLetters = (letters: string) => {
    for (let i = 0; i < letters.length; i++) service.addLetter(letters[i]);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardTileComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GamePlayService,
        {
          provide: AnswerService,
          useValue: <Partial<AnswerService>>{
            getAnswer: jest.fn().mockReturnValue(of(mockAnswer))
          }
        }
      ]
    });
    fixture = TestBed.createComponent(BoardTileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GamePlayService);
    component.letter = 'A';
    component.rowIdx = 0;
    component.tileIdx = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display letter input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tile')?.textContent).toEqual("A")
  });

  it('should have .no-score class before the guess is submitted', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(await firstValueFrom(service.evaluateLetter$(component.rowIdx, component.tileIdx))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('A');
  });

  it('should have correct class when letter matches answer at tile index', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const correctGuess = "ADEPT";

    callAddLetters(correctGuess);
    service.submitGuess();
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateLetter$(component.rowIdx, component.tileIdx))).toEqual(LetterScore.correct);
    expect(compiled.querySelector('.correct')?.textContent).toEqual('A');
  });
  it('should have Q, E and T should have incorrect, in-word and correct classes when QUIET is guessed', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const guess = "QUIET";

    callAddLetters(guess);
    service.submitGuess();
    component.letter = 'Q';
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateLetter$(component.rowIdx, component.tileIdx))).toEqual(LetterScore.notInWord);
    expect(compiled.querySelector('.incorrect')?.textContent).toEqual('Q');

    component.letter = 'E';
    component.tileIdx = 3;
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateLetter$(component.rowIdx, component.tileIdx))).toEqual(LetterScore.inWord);
    expect(compiled.querySelector('.in-word')?.textContent).toEqual('E');

    component.letter = 'T';
    component.tileIdx = 4;
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateLetter$(component.rowIdx, component.tileIdx))).toEqual(LetterScore.correct);
    expect(compiled.querySelector('.correct')?.textContent).toEqual('T');
  });
});
