import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, firstValueFrom } from 'rxjs';

import { KeyComponent } from './key.component';
import { GamePlayService } from '../services/game-play.service';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer';
import { LetterScore } from '../models/letter-score';

let component: KeyComponent;
let fixture: ComponentFixture<KeyComponent>;
let service: GamePlayService;
const mockAnswer: Answer = { id: 1, word: 'ADEPT' };
const callAddLetters = (letters: string) => {
  for (let i = 0; i < letters.length; i++) service.addLetter(letters[i]);
};

describe('KeyComponent - ENTER Key', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyComponent],
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
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    component.key = 'ENTER';
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display key input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toEqual('ENTER')
  });

  it('should assign a large button class to the ENTER key', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.large-btn')?.textContent).toEqual('ENTER');
  });

  it('should have .no-score class for the ENTER key', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('ENTER');
  });

  it('should not change the key class for the ENTER key after a new guess is submitted', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const enterGuess = 'ENTER';

    callAddLetters(enterGuess);
    service.submitGuess();
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('ENTER');

  });
});

describe('KeyComponent - DELETE Key', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyComponent],
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
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    component.key = 'DELETE';
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display key input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toEqual('DELETE')
  });

  it('should assign a large button class to the DELETE key', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.large-btn')?.textContent).toEqual('DELETE');
  });

  it('should have .no-score class for the DELETE key', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('DELETE');
  });

  it('should not change key class for the DELETE key given new accepted guess', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const enterGuess = 'DELTS';

    callAddLetters(enterGuess);
    service.submitGuess();
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('DELETE');

  });
});

describe('KeyComponent - A Key', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyComponent],
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
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    component.key = 'A';
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display key Input in button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toEqual('A');
  });

  it('should render each key with a unique id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(`#key-A`)?.textContent).toContain('A')
  });

  it('should set key class to in-word when SPARE is an accepted guess', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('A');

    const newGuess = 'SPARE';
    callAddLetters(newGuess);
    service.submitGuess();
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.inWord);
    expect(compiled.querySelector('.in-word')?.textContent).toEqual('A');
  });

  it('should set key class to .correct when ADEPT is an accepted guess', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('A');

    const correctGuess = 'ADEPT';
    callAddLetters(correctGuess);
    service.submitGuess();
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.correct);
    expect(compiled.querySelector('.correct')?.textContent).toEqual('A');
  });
});

describe('KeyComponent - Q Key', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyComponent],
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
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    component.key = 'Q';
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display key Input in button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toEqual('Q');
  });

  it('should render each key with a unique id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(`#key-Q`)?.textContent).toContain('Q')
  });

  it('should set key class to .incorrect when a Q is guessed but not in answer', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.scoreless);
    expect(compiled.querySelector('.no-score')?.textContent).toEqual('Q');

    const newGuess = 'QUIET';
    callAddLetters(newGuess);
    service.submitGuess();
    fixture.detectChanges();

    expect(await firstValueFrom(service.evaluateKey$(component.key))).toEqual(LetterScore.notInWord);
    expect(compiled.querySelector('.incorrect')?.textContent).toEqual('Q');
  });
});
