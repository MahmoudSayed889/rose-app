import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
<<<<<<< HEAD
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductCardComponent, TitleComponent } from 'reusable-components';
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/product';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { ToastService } from '../../../../shared/services/toast.service';
=======
import { TranslatePipe } from '@ngx-translate/core';
import { ProductCardComponent, TitleComponent } from 'reusable-components';
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/product';
>>>>>>> 1c8b478 (feat: product filters)

@Component({
  selector: 'app-related-products',
  imports: [TitleComponent, ProductCardComponent, TranslatePipe],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent implements OnInit {
  private _productsService = inject(ProductsService);
<<<<<<< HEAD
  private _wishlistService = inject(WishlistService);
  private _toastService = inject(ToastService);
  private _translateService = inject(TranslateService);
=======
>>>>>>> 1c8b478 (feat: product filters)

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
<<<<<<< HEAD

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
=======
>>>>>>> 1c8b478 (feat: product filters)
}
