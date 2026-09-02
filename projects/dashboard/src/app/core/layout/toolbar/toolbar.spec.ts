import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toolbar } from './toolbar';
import { LayoutService } from '../../services/layout.service';

describe('Toolbar', () => {
  let component: Toolbar;
  let fixture: ComponentFixture<Toolbar>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Toolbar);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reflects the breadcrumb items set on LayoutService', () => {
    const items = [{ label: 'Dashboard' }, { label: 'Categories' }];

    layoutService.setToolbarItems(items);

    expect(component.items()).toEqual(items);
  });
});
