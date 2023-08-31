import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';

import { GamePlayService } from './game-play.service';
import { AnswerService } from './answer.service';
import { Answer } from '../models/answer';
import { LetterScore } from '../models/letter-score';

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
  it('should return letter scores for A, T, C, and Q keys when ACTED is guessed', async () => {
    const wrongGuess = 'ACTED';

    callAddLetters(wrongGuess);
    service.submitGuess();

    expect(await firstValueFrom(service.evaluateKey$('A'))).toEqual(LetterScore.correct);
    expect(await firstValueFrom(service.evaluateKey$('T'))).toEqual(LetterScore.inWord);
    expect(await firstValueFrom(service.evaluateKey$('C'))).toEqual(LetterScore.notInWord);
    expect(await firstValueFrom(service.evaluateKey$('Q'))).toEqual(LetterScore.scoreless);
  });

  it('should always return the LetterScore scoreless for ENTER and DELETE', async () => {
    const enterGuess = 'ENTER';

    callAddLetters(enterGuess);
    service.submitGuess();

    expect(await firstValueFrom(service.evaluateKey$('ENTER'))).toEqual(LetterScore.scoreless);
    expect(await firstValueFrom(service.evaluateKey$('DELETE'))).toEqual(LetterScore.scoreless);
  });

  it('should instaniate an empty board with the same number of rows as parameter', async () => {
    const rows = 10;
    const expectedBoard = Array(rows).fill("");

    expect(await firstValueFrom(service.getBoard$(rows))).toEqual(expectedBoard);
  });

  it('should update board with current guess at currentGuessIdx$', async () => {
    const guess = 'GUESS';

    callAddLetters(guess);

    expect(await firstValueFrom(service.getBoard$(6))).toEqual([guess, "", "", "", "", ""]);
    expect(await firstValueFrom(service.currentGuessIdx$)).toEqual(0);
  });

  it('should update the board when a guess is submitted', async () => {
    const guess = 'GUESS';

    callAddLetters(guess);
    service.submitGuess();

    expect(await firstValueFrom(service.getBoard$(6))).toEqual([guess, "", "", "", "", ""]);
    expect(await firstValueFrom(service.currentGuessIdx$)).toEqual(1);
  });
});
