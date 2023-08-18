import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GameComponent } from './game.component';
import { GamePlayService } from '../services/game-play.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let service: GamePlayService;
  let guessResult: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GamePlayService]
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GamePlayService);
    guessResult = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onKeyDown after a keydown event', () => {
    let handleKeydownSpy = jest.spyOn(component, 'onKeyDown');
    let keydown = new KeyboardEvent('keydown', { 'key': 'a' });

    document.dispatchEvent(keydown);
    service.currentGuess$.subscribe(currentGuess => guessResult = currentGuess);

    expect(guessResult).toEqual('A');
    expect(handleKeydownSpy).toHaveBeenCalled();
  });
});
