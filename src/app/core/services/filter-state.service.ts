import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilterStateService {
  readonly selectedCategoryId = signal<string>('');
  readonly selectedOccasionId = signal<string>('');
  readonly minRating = signal<number | null>(null);
  readonly minPrice = signal<number | null>(null);
  readonly maxPrice = signal<number | null>(null);

  readonly hasActiveFilters = computed(
    () =>
      this.selectedCategoryId().length > 0 ||
      this.selectedOccasionId().length > 0 ||
      this.minRating() !== null ||
      this.minPrice() !== null ||
      this.maxPrice() !== null,
  );

  isCategorySelected(id: string): Signal<boolean> {
    return computed(() => this.selectedCategoryId().includes(id));
  }

  resetCategories(): void {
    this.selectedCategoryId.set('');
  }

  isOccasionSelected(id: string): Signal<boolean> {
    return computed(() => this.selectedOccasionId().includes(id));
  }

  resetOccasions(): void {
    this.selectedOccasionId.set('');
  }

  setMinRating(rating: number): void {
    if (this.minRating() === rating) {
      this.minRating.set(null);
    } else {
      this.minRating.set(rating);
    }
  }

  resetRating(): void {
    this.minRating.set(null);
  }

  setPriceRange(min: number | null, max: number | null): void {
    this.minPrice.set(min);
    this.maxPrice.set(max);
  }

  resetPrice(): void {
    this.minPrice.set(null);
    this.maxPrice.set(null);
  }

  resetAll(): void {
    this.selectedCategoryId.set('');
    this.selectedOccasionId.set('');
    this.minRating.set(null);
    this.minPrice.set(null);
    this.maxPrice.set(null);
  }
}
