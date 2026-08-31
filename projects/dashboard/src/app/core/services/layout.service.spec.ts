import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('starts with no toolbar items', () => {
    expect(service.toolbarItems()).toEqual([]);
  });

  it('updates toolbarItems when setToolbarItems is called', () => {
    const items = [{ label: 'Dashboard' }, { label: 'Categories' }];

    service.setToolbarItems(items);

    expect(service.toolbarItems()).toEqual(items);
  });

  it('replaces the previous items on each call', () => {
    service.setToolbarItems([{ label: 'Dashboard' }, { label: 'Categories' }]);
    service.setToolbarItems([{ label: 'Dashboard' }, { label: 'Products' }]);

    expect(service.toolbarItems()).toEqual([{ label: 'Dashboard' }, { label: 'Products' }]);
  });
});
