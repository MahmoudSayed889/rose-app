import { Service, signal } from '@angular/core';
import type { MenuItem } from 'primeng/api';

@Service()
export class LayoutService {
  private readonly _toolbarItems = signal<MenuItem[]>([]);

  readonly toolbarItems = this._toolbarItems.asReadonly();

  setToolbarItems(items: MenuItem[]): void {
    this._toolbarItems.set(items);
  }
}
