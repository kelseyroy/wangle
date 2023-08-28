import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { KeyboardComponent } from './keyboard.component';
import { KeyComponent } from '../key/key.component';
import { GamePlayService } from '../services/game-play.service';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;
  let service: GamePlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        KeyboardComponent,
        KeyComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [GamePlayService]
    });
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create three keyboard rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#row-0')).toBeTruthy();
    expect(compiled.querySelector('#row-1')).toBeTruthy();
    expect(compiled.querySelector('#row-2')).toBeTruthy();
  });
});
