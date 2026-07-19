import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilterStateService {
  readonly selectedCategoryIds = signal<string[]>([]);
  readonly selectedOccasionIds = signal<string[]>([]);
  readonly minRating = signal<number | null>(null);
  readonly minPrice = signal<number | null>(null);
  readonly maxPrice = signal<number | null>(null);

  readonly hasActiveFilters = computed(
    () =>
      this.selectedCategoryIds().length > 0 ||
      this.selectedOccasionIds().length > 0 ||
      this.minRating() !== null ||
      this.minPrice() !== null ||
      this.maxPrice() !== null,
  );

  toggleCategory(id: string): void {
    this.selectedCategoryIds.update((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id],
    );
  }

  isCategorySelected(id: string): Signal<boolean> {
    return computed(() => this.selectedCategoryIds().includes(id));
  }

  resetCategories(): void {
    this.selectedCategoryIds.set([]);
  }

  toggleOccasion(id: string): void {
    this.selectedOccasionIds.update((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id],
    );
  }

  isOccasionSelected(id: string): Signal<boolean> {
    return computed(() => this.selectedOccasionIds().includes(id));
  }

  resetOccasions(): void {
    this.selectedOccasionIds.set([]);
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
    this.selectedCategoryIds.set([]);
    this.selectedOccasionIds.set([]);
    this.minRating.set(null);
    this.minPrice.set(null);
    this.maxPrice.set(null);
  }
}
