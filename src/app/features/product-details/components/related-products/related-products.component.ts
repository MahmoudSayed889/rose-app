import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductCardComponent, TitleComponent } from 'reusable-components';
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/product';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-related-products',
  imports: [TitleComponent, ProductCardComponent, TranslatePipe],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent implements OnInit {
  private _productsService = inject(ProductsService);
  private _wishlistService = inject(WishlistService);
  private _toastService = inject(ToastService);
  private _translateService = inject(TranslateService);

  products: WritableSignal<Product[]> = signal([]);

  ngOnInit(): void {
    this._productsService.getProducts({ page: 1, limit: 4 }).subscribe({
      next: (res) => {
        this.products.set(res.payload.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
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
}
