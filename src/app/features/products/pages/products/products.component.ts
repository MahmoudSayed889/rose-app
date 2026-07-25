import { Component, computed, inject, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent,
    PaginatorComponent,
    FiltersSidebarComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent extends AppComponentBase implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly filterState = inject(FilterStateService);
  private readonly router = inject(Router);

  private _productsService = inject(ProductsService)
  private _cartFacad = inject(CartFacadeService)
  private _router = inject(Router)
  private readonly _wishlistFacadeService = inject(WishlistFacadeService);
  allProducts = signal<Product[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalRecords = signal<number>(0);
  pageLimit = signal<number>(20);
  isLoading = signal<boolean>(false);

  filteredProducts = computed(() => {
    const selectedCategoryIds = this.filterState.selectedCategoryIds();
    const selectedOccasionIds = this.filterState.selectedOccasionIds();
    const minRating = this.filterState.minRating();
    const minPrice = this.filterState.minPrice();
    const maxPrice = this.filterState.maxPrice();

    return this.allProducts().filter((p) => {
      const categoryMatch =
        selectedCategoryIds.length === 0 ||
        selectedCategoryIds.includes(p.categoryId);

      const occasionMatch =
        selectedOccasionIds.length === 0 ||
        p.occasions.some((o) => selectedOccasionIds.includes(o.occasionId));

      const ratingMatch = minRating === null || p.rating >= minRating;

      const productPrice = +p.price;
      const priceMatch =
        (minPrice === null || productPrice >= minPrice) &&
        (maxPrice === null || productPrice <= maxPrice);

      return categoryMatch && occasionMatch && ratingMatch && priceMatch;
    });
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productsService.getProductsWithFilter(this.currentPage(), this.pageLimit()).subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        this.totalPages.set(res.metadata.totalPages);
        this.totalRecords.set(res.metadata.total);
        this.pageLimit.set(res.metadata.limit);
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

  logFavoriteToggle(productId: string | number): void {
    console.log('favoriteToggle', productId);
  }

  logCardClick(productId: string | number): void {
    console.log('cardClick', productId);
    this.router.navigate(['/product-details', productId]);
  }

  onPageChange(event: PaginatorState): void {
    this.currentPage.set((event.page ?? 0) + 1);
    this.pageLimit.set(event.rows ?? this.pageLimit());
    this.loadProducts();
  }
}
