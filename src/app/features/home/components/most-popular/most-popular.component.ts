import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import {
  ButtonComponent,
  ProductCardComponent,
  TitleComponent,
} from 'reusable-components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { HomeService } from '../../services/home.service';
import { Category, CategoryResponse } from './models/category';
import { Product, ProductsList } from '../../../products/models/product';
import { icons } from 'lucide-angular';
import { AddToCartREQ } from '../../../cart/models/cart.interface';
import { CartFacadeService } from '../../../cart/services/cart/cart-facade.service';
import { WishlistFacadeService } from '../../../wishlist/services/wishlist-facade.service';

@Component({
  selector: 'app-most-popular',
  imports: [
    NgFor,
    NgIf,
    TranslatePipe,
    SkeletonModule,
    TitleComponent,
    ProductCardComponent,
    ButtonComponent,
  ],
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostPopularComponent extends AppComponentBase implements OnInit {
  private _homeService = inject(HomeService);
  private _router = inject(Router);
  private _translateService = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private _wishlistFacadeService = inject(WishlistFacadeService);
  private _cartFacad = inject(CartFacadeService);

  // State signals
  categories = signal<Category[]>([]);
  selectedCategory = signal<Category | null>(null);
  products = signal<Product[]>([]);
  loadingCategories = signal<boolean>(false);
  loadingProducts = signal<boolean>(false);
  errorCategories = signal<string | null>(null);
  errorProducts = signal<string | null>(null);
  productsLoaded = signal<boolean>(false);

  icons = icons

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts()
  }

  addToCart(productId: string): void {
    const data: AddToCartREQ = {
      productId,
      quantity: 1
    }
    this._cartFacad.addToCart(data)
  }

  loadCategories(): void {
    this.loadingCategories.set(true);
    this.errorCategories.set(null);

    this._homeService
      .getCategories({ page: 1, limit: 20 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: CategoryResponse) => {
          this.loadingCategories.set(false);
          if (response.payload?.data && response.payload.data.length > 0) {
            this.categories.set(response.payload.data.filter(cate => cate._count?.products > 0))
            // Auto-select first category
            // this.onCategorySelect(this.categories()[0]);
          }
        },
        error: (error) => {
          this.loadingCategories.set(false);
          const errorMsg = this._translateService.instant(
            'home.mostPopular.errorCategories'
          );
          this.errorCategories.set(errorMsg);
          this._toastService.toaster('error', errorMsg);
          console.error('Error loading categories:', error);
        },
      });
  }

  loadProducts(categoryId?: string): void {
    this.loadingProducts.set(true);
    this.errorProducts.set(null);

    this._homeService
      .getProducts({ page: 1, limit: 20 }, categoryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: ProductsList) => {
          this.loadingProducts.set(false);
          this.productsLoaded.set(true);
          this.products.set(response.payload?.data || []);
        },
        error: (error) => {
          this.loadingProducts.set(false);
          const errorMsg = this._translateService.instant(
            'home.mostPopular.errorProducts'
          );
          this.errorProducts.set(errorMsg);
          this._toastService.toaster('error', errorMsg);
          console.error('Error loading products:', error);
        },
      });
  }

  onCategorySelect(category: Category): void {
    this.selectedCategory.set(category);
    this.loadProducts(category.id);
  }

  onAllSelect(): void {
    this.selectedCategory.set(null);
    this.loadProducts();
  }

  onProductClick(productId: string | number): void {
    this._router.navigate(['/product-details', productId]);
  }

  onFavoriteToggle(productId: string | number): void {
    this._wishlistFacadeService.addToWishlist(productId)
  }

  onSeeMoreClick(): void {
    this._router.navigate(['/products']);
  }

  onRetryCategories(): void {
    this.loadCategories();
  }

  onRetryProducts(): void {
    this.loadProducts(this.selectedCategory()?.id);
  }

  // TrackBy functions for performance
  trackByCategory(index: number, category: Category): string {
    return category.id;
  }

  trackByProduct(index: number, product: Product): string {
    return product.id;
  }
}

// Made with Bob
