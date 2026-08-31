import { TestBed } from '@angular/core/testing';
import { Overview } from './overview';
import { LayoutService } from '../../core/services/layout.service';

describe('Overview', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [Overview] });

    const fixture = TestBed.createComponent(Overview);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets its breadcrumb on the toolbar via LayoutService', () => {
    TestBed.configureTestingModule({ imports: [Overview] });

    TestBed.createComponent(Overview);
    const layoutService = TestBed.inject(LayoutService);

    expect(layoutService.toolbarItems()).toEqual([{ label: 'Dashboard' }, { label: 'Overview' }]);
  });
});
