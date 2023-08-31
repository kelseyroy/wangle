import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, firstValueFrom } from 'rxjs';

import { GameOverModalComponent } from './game-over-modal.component';
import { GamePlayService } from '../services/game-play.service';
import { Answer } from '../models/answer';
import { AnswerService } from '../services/answer.service';
import { Status } from '../models/game';

const mockAnswer: Answer = { id: 1, word: 'ADEPT' };

describe('GameOverModalComponent', () => {
  let component: GameOverModalComponent;
  let fixture: ComponentFixture<GameOverModalComponent>;
  let service: GamePlayService;
  const callAddLetters = (letters: string) => {
    for (let i = 0; i < letters.length; i++) service.addLetter(letters[i]);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameOverModalComponent],
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
    fixture = TestBed.createComponent(GameOverModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hidden class when game status is playing', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(await firstValueFrom(service.status$)).toEqual(Status.playing);
    expect(compiled.querySelector('.hidden h1')?.textContent).toEqual('Game Over');
  });

  it('should display a winning message when game has been won', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const answer = "ADEPT"

    callAddLetters(answer);
    service.submitGuess();
    fixture.detectChanges();

    expect(await firstValueFrom(service.status$)).toEqual(Status.won);
    expect(compiled.querySelector('.open .message')?.textContent).toEqual('Congratulations! You win!');
  });

  it('should display a losing message when game has been lost', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wrongGuess = 'WRONG';

    for (let i = 0; i < 6; i++) {
      callAddLetters(wrongGuess);
      service.submitGuess();
    }
    fixture.detectChanges();

    expect(await firstValueFrom(service.status$)).toEqual(Status.lost);
    expect(compiled.querySelector('.open .message')?.textContent).toEqual('Better luck next time.');
  });
});
