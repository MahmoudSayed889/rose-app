import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/product';
import { ProductCardBadge, ProductCardComponent } from "reusable-components";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AddToCartREQ } from '../../../cart/models/cart.interface';
import { CartFacadeService } from '../../../cart/services/cart/cart-facade.service';

@Component({
  selector: 'app-best-selling',
  imports: [CarouselModule, CommonModule, ProductCardComponent, TranslatePipe],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.scss',
})
export class BestSellingComponent {
  private readonly _productService = inject(ProductsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _ngxSpinner = inject(NgxSpinnerService);
  private readonly _wishlistService = inject(WishlistService);
  private readonly _toastService = inject(ToastService);
  private readonly _translateService = inject(TranslateService);
  private readonly _cartFacad = inject(CartFacadeService);

  bestSellingProducts: WritableSignal<Product[] | null> = signal(null);

  carouselResponsiveOptions = [
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  addToCart(productId: string): void {
    const data: AddToCartREQ = {
      productId,
      quantity: 1
    }
    this._cartFacad.addToCart(data)
  }

  getBestSelling() {
    this._productService.getBestSellingProducts()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.bestSellingProducts.set(res);          
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  getProductTags(product: Product): ProductCardBadge[] {
    return this._productService.getProductsTags(product);
  }

  onCardClick(productId: string | number): void {
    this._router.navigate(['/product-details', productId])
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

  ngOnInit() {
    this.getBestSelling();
  }

}
