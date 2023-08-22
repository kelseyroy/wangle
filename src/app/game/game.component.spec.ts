import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { GameComponent } from './game.component';
import { GamePlayService } from '../services/game-play.service';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { KeyComponent } from '../key/key.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let service: GamePlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        KeyboardComponent,
        KeyComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [GamePlayService]
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onKeyDown after a keydown event', async () => {
    const handleKeydownSpy = jest.spyOn(component, 'onKeyDown');
    const keydown = new KeyboardEvent('keydown', { 'key': 'a' });

    document.dispatchEvent(keydown);
    
    expect(handleKeydownSpy).toHaveBeenCalled();
    expect(await firstValueFrom(service.currentGuess$)).toEqual('A');
  });
});
