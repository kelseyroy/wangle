import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyComponent } from './key/key.component';
import { BoardComponent } from './board/board.component';
import { BoardRowComponent } from './board-row/board-row.component';
import { BoardTileComponent } from './board-tile/board-tile.component';
import { GameOverModalComponent } from './game-over-modal/game-over-modal.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameComponent,
        KeyboardComponent,
        KeyComponent,
        BoardComponent,
        BoardRowComponent,
        BoardTileComponent
        GameOverModalComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
    })
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Wangle'`, () => {
    expect(app.title).toEqual('Wangle');
  });

  it('should render title as h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Wangle');
  });
});
