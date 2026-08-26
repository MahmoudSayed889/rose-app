import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionsComponent } from './occasions.component';

describe('OccasionsComponent', () => {
  let component: OccasionsComponent;
  let fixture: ComponentFixture<OccasionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccasionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccasionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
