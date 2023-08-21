import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyComponent } from './key.component';

describe('KeyComponent', () => {
  let component: KeyComponent;
  let fixture: ComponentFixture<KeyComponent>;
  const keys: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyComponent]
    });
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign a specific large button class for the ENTER and DELETE keys', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.whenStable().then(() => {
      expect(compiled.querySelector('.large-btw')?.textContent).toContain('ENTER' || 'DELETE');
    });
  });
  it('should render each key with a unique id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.whenStable().then(() => {
      keys.forEach(key =>
        expect(compiled.querySelector(`#key-${key}`)?.textContent).toContain(key)
      )
    });
  });
});
