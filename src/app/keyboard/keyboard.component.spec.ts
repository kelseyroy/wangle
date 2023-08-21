import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';
import { KeyComponent } from '../key/key.component';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        KeyboardComponent,
        KeyComponent
      ]
    });
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create three keyboard rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#row-0')).toBeTruthy();
    expect(compiled.querySelector('#row-1')).toBeTruthy();
    expect(compiled.querySelector('#row-2')).toBeTruthy();
  });
});
