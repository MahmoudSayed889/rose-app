import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLibrary } from './auth-library';

describe('AuthLibrary', () => {
  let component: AuthLibrary;
  let fixture: ComponentFixture<AuthLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
