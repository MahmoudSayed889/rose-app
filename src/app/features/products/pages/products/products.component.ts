import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCardComponent } from 'reusable-components';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FilterStateService } from '../../../../core/services/filter-state.service';
import { FiltersSidebarComponent } from '../../../../shared/components/filters-sidebar/filters-sidebar.component';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [FiltersSidebarComponent, ProductCardComponent, PaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly filterState = inject(FilterStateService);
  private readonly router = inject(Router);

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
    this.productsService.getProducts(this.currentPage(), this.pageLimit()).subscribe({
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

  logFavoriteToggle(productId: string | number): void {
    console.log('favoriteToggle', productId);
  }

  logAddToCart(productId: string | number): void {
    console.log('addToCart', productId);
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
