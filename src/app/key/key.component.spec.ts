import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { KeyComponent } from './key.component';
import { GamePlayService } from '../services/game-play.service';

describe('KeyComponent', () => {
  let component: KeyComponent;
  let fixture: ComponentFixture<KeyComponent>;
  let service: GamePlayService;
  const keys: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [GamePlayService]
    });
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GamePlayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign a specific large button class for the ENTER and DELETE keys', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.whenStable().then(() => {
      expect(compiled.querySelector('.large-btn')?.textContent).toContain('ENTER' || 'DELETE');
    });
  });
  it('should render each key with a unique id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.whenStable().then(() => {
      console.log(compiled.querySelector(`#key-N`)?.textContent);
      keys.forEach(key =>
        // console.log(compiled.querySelector(`#key-${key}`)?.textContent)
        expect(compiled.querySelector(`#key-${key}`)?.textContent).toContain(key)
      )
    });
  });
});
