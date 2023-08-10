import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should output the given message as an error to the console', () => {
    const error = jest.spyOn(console, 'error').mockImplementation();
    const errorMessage = "This is an error message";
    service.error(errorMessage);
    expect(error).toHaveBeenCalled();
    expect(error).toBeCalledWith('%c' + errorMessage, 'color: #DC143C');
    error.mockReset();
  });

  it('should output the given message as a warning to the console', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    const warningMessage = "This is an warning message";
    service.warn(warningMessage);
    expect(warn).toHaveBeenCalled();
    expect(warn).toBeCalledWith('%c' + warningMessage, 'color: #FF8C00');
    warn.mockReset();
  });

  it('should output informational message to the console', () => {
    const info = jest.spyOn(console, 'info').mockImplementation();
    const infoMessage = "This is an info message";
    service.info(infoMessage);
    expect(info).toHaveBeenCalled();
    expect(info).toBeCalledWith('%c' + infoMessage, 'color: #6495ED');
    info.mockReset();
  });
});
