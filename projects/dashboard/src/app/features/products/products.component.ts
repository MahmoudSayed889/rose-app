import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-products',
  imports: [
    TableComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {

  private readonly _layoutService = inject(LayoutService);

  products = []

  ngOnInit(): void {
    this.initBreadcrumb()
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard' },
      { label: 'sidebar.nav.products' }
    ]);
  }
}
