import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, from, of, defer } from 'rxjs';

import { GameComponent } from './game.component';
import { Answer } from '../models/answer';
import { AnswerService } from '../services/answer.service';

const mockAnswer = { id: 1, word: 'ADEPT' } as Answer;

const answerServiceStub = {
  getAnswer() {
    return of(mockAnswer);
  }
};

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [{ provide: AnswerService, useValue: answerServiceStub }]
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set "ADEPT" as answer', async () => {
    const answer = component.answer.word;
    expect(answer).toEqual(mockAnswer.word);
  });
});
