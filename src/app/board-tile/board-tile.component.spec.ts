import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTileComponent } from './board-tile.component';

describe('BoardTileComponent', () => {
  let component: BoardTileComponent;
  let fixture: ComponentFixture<BoardTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardTileComponent]
    });
    fixture = TestBed.createComponent(BoardTileComponent);
    component = fixture.componentInstance;
    component.letter = 'A';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display letter input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tile')?.textContent).toEqual("A")
  });
});
