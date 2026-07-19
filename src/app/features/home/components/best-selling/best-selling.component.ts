import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/product';
import { ProductCardComponent } from "reusable-components";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { ToastService } from '../../../../shared/services/toast.service';

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

  getBestSelling() {
    this._productService.getBestSellingProducts()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.bestSellingProducts.set(res);
          this.mergeProductTags();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  getProductTags(product: Product): string[] {
    return this._productService.getProductsTags(product);
  }

  mergeProductTags(): void {
    this.bestSellingProducts()?.map((product) => {
      const tags = this.getProductTags(product);
      product.tags = tags;
    })
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
