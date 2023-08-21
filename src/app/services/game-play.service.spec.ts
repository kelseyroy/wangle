import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { GamePlayService } from './game-play.service';
import { AnswerService } from './answer.service';

describe('GamePlayService', () => {
  let service: GamePlayService;
  let guessResult: string;
  let acceptedGuessesResult: string[];
  let callAddLetters: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AnswerService]
    });
    service = TestBed.inject(GamePlayService);
    guessResult = '';
    acceptedGuessesResult = [];
    callAddLetters = (letters: string) => {
      for (let i = 0; i < letters.length; i++) service.addLetter(letters[i]);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return A when A is added to currentGuess', async () => {
    let newLetter = 'A';

    service.addLetter(newLetter);

    expect(await firstValueFrom(service.currentGuess$)).toEqual(newLetter);
  });

  it('should return ABCDE when A, B, C, D and E are added to currentGuess', async () => {
    let letters = 'ABCDE';

    callAddLetters(letters);

    expect(await firstValueFrom(service.currentGuess$)).toEqual(letters);
  });

  it('should return DORIT when DORITE is attempted for currentGuess', async () => {
    let letters = 'DORITE';

    callAddLetters(letters);

    expect(await firstValueFrom(service.currentGuess$)).toEqual('DORIT');
  });

  it('should return LOL when removeLetter is called twice to currentGuess', async () => {
    let letters = 'LOLLY';

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
