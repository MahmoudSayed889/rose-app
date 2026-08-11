import { Component, computed, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductsService } from '../../services/products.service';
import { ExternalParams } from '../../../../shared/models/external-params';
import { Product, ProductsList } from '../../models/product';
import { PaginatorComponent, ProductCardComponent } from 'reusable-components';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/types/paginator';

import { AddToCartREQ } from '../../../cart/models/cart.interface';
import { CartFacadeService } from '../../../cart/services/cart/cart-facade.service';
import { WishlistFacadeService } from '../../../wishlist/services/wishlist-facade.service';
import { FilterStateService } from '../../../../core/services/filter-state.service';
import { FiltersSidebarComponent } from '../../../../shared/components/filters-sidebar/filters-sidebar.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent,
    PaginatorComponent,
    FiltersSidebarComponent,
    TranslatePipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends AppComponentBase implements OnInit {
  private readonly filterState = inject(FilterStateService);
  private readonly _productsService = inject(ProductsService)
  private readonly _cartFacad = inject(CartFacadeService)
  private readonly _router = inject(Router)
  private readonly _wishlistFacadeService = inject(WishlistFacadeService);

  readonly filters = computed(() => ({
    categoryId: this.filterState.selectedCategoryId() || undefined,
    occasionId: this.filterState.selectedOccasionId() || undefined,
    minRating: this.filterState.minRating() ?? undefined,
    minPrice: this.filterState.minPrice() ?? undefined,
    maxPrice: this.filterState.maxPrice() ?? undefined,
  }));

  allProducts = signal<Product[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    super();

    effect(() => {
      this.filters();

      untracked(() => {
        this.paginator.update(p => ({
          ...p,
          page: 1
        }));

        this.loadProducts();
      });
    });
  }

  ngOnInit(): void {
    // this.loadProducts();
  }

  private getParams(): ExternalParams {
    return {
      page: this.paginator().page,
      limit: this.paginator().limit,
      ...this.filters(),
    };
  }

  loadProducts(): void {
    this.isLoading.set(true);

    this._productsService.getProducts(this.getParams()).subscribe({
      next: (res) => {
        this.allProducts.set(res.payload.data);

        this.paginator.set({
          page: res.payload.metadata.page,
          limit: res.payload.metadata.limit,
          total: res.payload.metadata.total,
          totalPages: res.payload.metadata.totalPages,
        });

        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onFavoriteToggle(productId: string | number): void {
    this._wishlistFacadeService.addToWishlist(productId)
  }

  addToCart(productId: string): void {
    const data: AddToCartREQ = {
      productId,
      quantity: 1,
    };
    this._cartFacad.addToCart(data);
  }

  logCardClick(productId: string | number): void {
    console.log('cardClick', productId);
    this._router.navigate(['/product-details', productId]);
  }

  onPageChange(event: PaginatorState): void {
    this.paginator.update(p => ({
      ...p,
      page: (event.page ?? 0) + 1,
      limit: event.rows ?? p.limit
    }));
    this.loadProducts();
  }
}
