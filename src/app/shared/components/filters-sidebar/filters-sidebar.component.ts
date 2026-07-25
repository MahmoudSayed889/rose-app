import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterStateService } from '../../../core/services/filter-state.service';
import { CategoriesService } from '../../services/categories.service';
import { OccasionsService } from '../../services/occasions.service';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { OccasionCardComponent } from '../occasion-card/occasion-card.component';

@Component({
  selector: 'app-filters-sidebar',
  imports: [CategoryCardComponent, OccasionCardComponent],
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersSidebarComponent {
  private readonly categoriesService = inject(CategoriesService);
  private readonly occasionsService = inject(OccasionsService);
  readonly filterState = inject(FilterStateService);

  readonly categories = toSignal(this.categoriesService.getAllCategories(), {
    initialValue: [],
  });

  readonly occasions = toSignal(this.occasionsService.getAllOccasions(), {
    initialValue: [],
  });

  readonly selectedCategoryIds = this.filterState.selectedCategoryIds;
  readonly selectedOccasionIds = this.filterState.selectedOccasionIds;
  readonly minRating = this.filterState.minRating;
  readonly minPrice = this.filterState.minPrice;
  readonly maxPrice = this.filterState.maxPrice;
  readonly hasActiveFilters = this.filterState.hasActiveFilters;
  readonly stars = [1, 2, 3, 4, 5];

  minPriceInput = signal<string>('');
  maxPriceInput = signal<string>('');

  constructor() {
    effect(() => {
      if (this.filterState.minPrice() === null) {
        this.minPriceInput.set('');
      }
      if (this.filterState.maxPrice() === null) {
        this.maxPriceInput.set('');
      }
    });
  }

  toggleCategory = (id: string) => this.filterState.toggleCategory(id);

  resetCategories = () => this.filterState.resetCategories();

  isCategorySelected = (id: string) => this.filterState.isCategorySelected(id);

  toggleOccasion = (id: string) => this.filterState.toggleOccasion(id);

  resetOccasions = () => this.filterState.resetOccasions();

  isOccasionSelected = (id: string) => this.filterState.isOccasionSelected(id);

  setMinRating = (rating: number) => this.filterState.setMinRating(rating);

  resetRating = () => this.filterState.resetRating();

  resetAll = () => this.filterState.resetAll();

  onPriceBlur(): void {
    const min = this.minPriceInput() === '' ? null : +this.minPriceInput();
    const max = this.maxPriceInput() === '' ? null : +this.maxPriceInput();
    this.filterState.setPriceRange(min, max);
  }

  onPriceKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onPriceBlur();
      (event.target as HTMLElement).blur();
    }
  }
}
