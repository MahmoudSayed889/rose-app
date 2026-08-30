import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults to open and non-overlay (desktop push mode)', () => {
    expect(component.open()).toBe(true);
    expect(component.overlay()).toBe(false);
  });

  it('closes itself on item click when in overlay (mobile) mode', () => {
    fixture.componentRef.setInput('overlay', true);

    component['handleItemClick']();

    expect(component.open()).toBe(false);
  });

  it('stays open on item click when not in overlay (desktop push) mode', () => {
    component.open.set(true);

    component['handleItemClick']();

    expect(component.open()).toBe(true);
  });
});
