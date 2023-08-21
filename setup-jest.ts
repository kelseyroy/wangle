// setupJest.ts
import 'jest-preset-angular/setup-jest';

jest.spyOn(global.console, 'info').mockImplementation(() => jest.fn());
