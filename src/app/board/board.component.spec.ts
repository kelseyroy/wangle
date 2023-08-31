import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BoardComponent } from './board.component';
import { GamePlayService } from '../services/game-play.service';
import { BoardRowComponent } from '../board-row/board-row.component';
import { BoardTileComponent } from '../board-tile/board-tile.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        BoardRowComponent,
        BoardTileComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [GamePlayService]
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
