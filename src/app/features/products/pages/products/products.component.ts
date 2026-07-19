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
import { TranslateService } from '@ngx-translate/core';
import { WishlistService } from '../../../wishlist/services/wishlist.service';


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
  private readonly _wishlistService = inject(WishlistService);
  private readonly _translateService = inject(TranslateService);

  products = signal<Product[]>([])

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    const params = {
      page: this.paginator().page,
      limit: this.paginator().limit
    } as ExternalParams
    this._productsService.getProducts(params).subscribe({
      next: (res: ProductsList) => {
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

  onFavoriteToggle(productId: string | number): void {
    this._wishlistService.addToWishlist(String(productId)).subscribe({
      next: () => {
        this._toastService.toaster('success', this._translateService.instant('wishlist.addedToWishlist'));
      },
      error: () => {
        this._toastService.toaster('error', this._translateService.instant('wishlist.addToWishlistError'));
      },
    });
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
