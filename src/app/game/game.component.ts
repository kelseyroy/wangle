import { Component, OnInit } from '@angular/core';

import { Answer } from '../models/answer';
import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  protected answer: Answer = { id: 0, word: '' };
  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.getAnswer();
  }

  getAnswer(): void {
    this.answerService.getAnswer()
      .subscribe(answer => this.answer = answer);
  }
}
