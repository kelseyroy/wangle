import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GameService } from './game.service';
import { Game, Status } from '../models/game';
import { Guess } from '../models/guess';
import { Answer } from '../models/answer';
import { GAMES } from '../mock-data/mock-games';

const gamesUrl = 'api/games';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GameService]
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request to return all Games', () => {
    const mockGames = GAMES;

    service.getGames().subscribe(game => {
      expect(game).toEqual(mockGames);
    });

    const req = httpMock.expectOne(gamesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
    httpMock.verify();
  });

  it('should make an HTTP POST request to create a new Game', () => {
    const newGame = <Game>{ acceptedGuesses: <Guess[]>[], answer: <Answer>{ id: 1, word: "MOCK" }, status: Status.playing };

    service.addGame(newGame).subscribe(game => {
      expect(game).toEqual(newGame);
    });

    const req = httpMock.expectOne({ method: "POST" });
    expect(req.request.method).toBe('POST');
    req.flush(newGame);
    httpMock.verify();
  });
});
