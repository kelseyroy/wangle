import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { AnswerService } from './answer.service';
import { Answer } from '../models/answer';

describe('AnswerService', () => {
  let service: AnswerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AnswerService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request to return an Answer', () => {
    const mockAnswer = <Answer>{ id: 1, word: 'MOCK' };

    service.getAnswer().subscribe(answer => {
      expect(answer).toEqual(mockAnswer);
    });

    const req = httpMock.expectOne(`api/answers/${service['_randomId']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAnswer);
    httpMock.verify();
  });

  it('should log error message and return the default Answer', () => {

    const defaultAnswer = <Answer>{ id: 1, word: 'ADEPT' };
    const errorMessage = 'This is a mock error message!';
    const consoleSpy = jest.spyOn(console, 'error');

    service.getAnswer().subscribe({
      next: () => fail('should not have succeeded'),
      error: (error: HttpErrorResponse) => {
        expect(error.message).toBe(errorMessage);
        expect(consoleSpy).toHaveBeenCalledWith(`getAnswer failed: ${errorMessage}`);
      },
    });

    const req = httpMock.expectOne(`api/answers/${service['_randomId']}`);
    req.flush(defaultAnswer);
    httpMock.verify();
    consoleSpy.mockRestore();
  });
});
