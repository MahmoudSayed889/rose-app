import { Component, inject } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  private readonly _layoutService = inject(LayoutService);

  constructor() {
    this._layoutService.setToolbarItems([{ label: 'Dashboard' }, { label: 'Overview' }]);
  }
}
