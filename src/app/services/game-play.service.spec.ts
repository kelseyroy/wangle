import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GamePlayService } from './game-play.service';
import { AnswerService } from './answer.service';

describe('GamePlayService', () => {
  let service: GamePlayService;
  let guessResult: string;
  let acceptedGuessesResult: string[];

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return A when A is added to currentGuess', () => {
    let newLetter = 'A';

    service.addLetter(newLetter);
    service.currentGuess$.subscribe(currentGuess => guessResult = currentGuess);

    expect(guessResult.includes(newLetter)).toBeTruthy()
  });

  it('should return ABCDE when A, B, C, D and E are added to currentGuess', () => {
    let letters = 'ABCDE';

    for (let i = 0; i < 5; i++) service.addLetter(letters[i]);
    service.currentGuess$.subscribe(currentGuess => guessResult = currentGuess);

    expect(guessResult.includes(letters)).toBeTruthy()
  });

  it('should return DORIT when DORITE is attempted for currentGuess', () => {
    let letters = 'DORITE';

    for (let i = 0; i < 6; i++) service.addLetter(letters[i]);
    service.currentGuess$.subscribe(currentGuess => guessResult = currentGuess);
    let canDoriteBeGuessed = 

    expect(guessResult.includes('DORIT')).toBeTruthy()
  });

  it('should return LOL when removeLetter is called 3 times to currentGuess', () => {
    let letters = 'LOLLY';

    for (let i = 0; i < 5; i++) service.addLetter(letters[i]);
    for (let i = 0; i < 2; i++) service.removeLetter();
    service.currentGuess$.subscribe(currentGuess => guessResult = currentGuess);

    expect(guessResult.includes('LOL')).toBeTruthy()
  });

  it('should submit a guess when valid guess is submitted', () => {
    let validGuess = 'ADEPT';
    let guessIdx = 0;
    let currentGuess = '';

    for (let i = 0; i < 5; i++) service.addLetter(validGuess[i]);
    service.submitGuess();
    service.acceptedGuesses$.subscribe(guesses => acceptedGuessesResult = guesses);
    service.currentGuessIdx$.subscribe(idx => guessIdx = idx);
    service.currentGuess$.subscribe(guess => currentGuess = guess);

    let isAdeptAccepted = acceptedGuessesResult.includes(validGuess);
    let isIdxUpdated = guessIdx === 1;
    let isCurrentGuessCleared = currentGuess === '';

    expect(isAdeptAccepted).toBeTruthy();
    expect(isIdxUpdated).toBeTruthy();
    expect(isCurrentGuessCleared).toBeTruthy();
  });

  it('should not update acceptedGuesses when an invalid guess is submitted', () => {
    let invalidGuess = 'DO';
    let guessIdx = 0;
    let currentGuess = '';

    for (let i = 0; i < 2; i++) service.addLetter(invalidGuess[i]);
    service.submitGuess();
    service.acceptedGuesses$.subscribe(guesses => acceptedGuessesResult = guesses);
    service.currentGuessIdx$.subscribe(idx => guessIdx = idx);
    service.currentGuess$.subscribe(guess => currentGuess = guess);

    let isDoAccepted = acceptedGuessesResult.includes(invalidGuess)
    let isIdxUpdated = guessIdx === 1;
    let isCurrentGuessCleared = currentGuess === '';

    expect(isDoAccepted).toBeFalsy();
    expect(isIdxUpdated).toBeFalsy();
    expect(isCurrentGuessCleared).toBeFalsy();
  });

});
