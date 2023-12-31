import { Logger } from './log.service';

describe('Logger', () => {
  let service: Logger;

  beforeEach(() => {
    service = new Logger();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should output the given message as an error to the console', () => {
    const error = jest.spyOn(console, 'error').mockImplementation();
    const errorMessage = "This is an error message";
    service.error(errorMessage);
    expect(error).toBeCalledWith('%c' + errorMessage, 'color: #DC143C');
  });

  it('should output the given message as a warning to the console', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    const warningMessage = "This is an warning message";
    service.warn(warningMessage);
    expect(warn).toBeCalledWith('%c' + warningMessage, 'color: #FF8C00');
  });

  it('should output informational message to the console', () => {
    const info = jest.spyOn(console, 'info').mockImplementation();
    const infoMessage = "This is an info message";
    service.info(infoMessage);
    expect(info).toBeCalledWith('%c' + infoMessage, 'color: #6495ED');
  });
});
