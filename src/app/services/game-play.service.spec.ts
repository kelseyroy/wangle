import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';

import { GamePlayService } from './game-play.service';
import { AnswerService } from './answer.service';
import { Answer } from '../models/answer';

const mockAnswer: Answer = { id: 1, word: 'ADEPT' }

describe('GamePlayService', () => {
  let service: GamePlayService;
  const callAddLetters = (letters: string) => {
    for (let i = 0; i < letters.length; i++) service.addLetter(letters[i]);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [{
        provide: AnswerService,
        useValue: <Partial<AnswerService>>{
          getAnswer: jest.fn().mockReturnValue(of(mockAnswer))
        }
      }]
    });
    service = TestBed.inject(GamePlayService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set Answer as adept', async () => {
    expect(await firstValueFrom(service.answer$)).toEqual(mockAnswer);
  });

  it('should return A when A is added to currentGuess', async () => {
    const newLetter = 'A';

    service.addLetter(newLetter);

    expect(await firstValueFrom(service.currentGuess$)).toEqual(newLetter);
  });

  it('should return ABCDE when A, B, C, D and E are added to currentGuess', async () => {
    const letters = 'ABCDE';

    callAddLetters(letters);

    expect(await firstValueFrom(service.currentGuess$)).toEqual(letters);
  });

  it('should return DORIT when DORITE is attempted for currentGuess', async () => {
    const letters = 'DORITE';

    callAddLetters(letters);

    expect(await firstValueFrom(service.currentGuess$)).toEqual('DORIT');
  });

  it('should return LOL when removeLetter is called twice to currentGuess', async () => {
    const letters = 'LOLLY';

    callAddLetters(letters);
    for (let i = 0; i < 2; i++) service.removeLetter();

    expect(await firstValueFrom(service.currentGuess$)).toEqual('LOL');
  });

  it('should submit a guess when valid guess is submitted', async () => {
    const validGuess = 'ADEPT';

    callAddLetters(validGuess);
    service.submitGuess();

    expect(await firstValueFrom(service.acceptedGuesses$)).toEqual([validGuess]);
    expect(await firstValueFrom(service.currentGuessIdx$)).toEqual(1);
    expect(await firstValueFrom(service.currentGuess$)).toEqual('');
  });

  it('should not update acceptedGuesses when an invalid guess is submitted', async () => {
    const invalidGuess = 'DO';

    callAddLetters(invalidGuess);
    service.submitGuess();

    expect(await firstValueFrom(service.acceptedGuesses$)).toEqual([]);
    expect(await firstValueFrom(service.currentGuessIdx$)).toEqual(0);
    expect(await firstValueFrom(service.currentGuess$)).toEqual(invalidGuess);
  });
});