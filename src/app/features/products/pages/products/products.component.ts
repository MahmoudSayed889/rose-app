import { Component, inject, OnInit, signal } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductsService } from '../../services/products.service';
import { ExternalParams } from '../../../../shared/models/external-params';
import { Product, ProductsList } from '../../models/product';
import { PaginatorComponent, ProductCardComponent } from 'reusable-components';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/types/paginator';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-products',
  imports: [
    FilterComponent,
    ProductCardComponent,
    PaginatorComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends AppComponentBase implements OnInit {

  private _productsService = inject(ProductsService)
  private _router = inject(Router)
  private readonly _ngxSpinner = inject(NgxSpinnerService);

  products = signal<Product[]>([])

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    const params = {
      page: this.paginator().page,
      limit: this.paginator().limit
    } as ExternalParams
    this._ngxSpinner.show();
    this._productsService.getProducts(params).subscribe({
      next: (res: ProductsList) => {
        this._ngxSpinner.hide();
        this.products.set(res.payload.data)

        this.paginator.set({
          page: res.payload.metadata.page,
          limit: res.payload.metadata.limit,
          total: res.payload.metadata.total,
          totalPages: res.payload.metadata.totalPages,
        })
      }
    })
  }

  logFavoriteToggle(productId: string | number): void {
    console.log('favoriteToggle', productId);
  }

  logAddToCart(productId: string | number): void {
    console.log('addToCart', productId);
  }

  logCardClick(productId: string | number): void {
    console.log('cardClick', productId);
    this._router.navigate(['/product-details', productId])
  }

  onPageChange(event: PaginatorState) {
    this.paginator.update(p => ({
      ...p,
      page: (event.page ?? 0) + 1,
      limit: event.rows ?? p.limit
    }));

    this.getProducts();
  }
}
