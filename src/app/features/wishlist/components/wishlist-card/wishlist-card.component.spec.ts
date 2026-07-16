import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCardComponent } from './wishlist-card.component';

describe('WishlistCardComponent', () => {
  let component: WishlistCardComponent;
  let fixture: ComponentFixture<WishlistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
