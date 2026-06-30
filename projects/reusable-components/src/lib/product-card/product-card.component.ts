import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';

export type ProductCardBadge = 'new' | 'hot' | 'out-of-stock';
export type ProductCardStarState = 'filled' | 'empty';

@Component({
  selector: 'lib-product-card',
  imports: [LucideAngularModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly icons = icons;
  @Input({ required: true }) productId!: string | number;
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) price!: number;
  @Input() badge: ProductCardBadge | null = null;
  @Input() isFavorite = false;

  @Output() favoriteToggle = new EventEmitter<string | number>();
  @Output() addToCart = new EventEmitter<string | number>();
  @Output() cardClick = new EventEmitter<string | number>();

  private readonly _rating = signal(0);

  @Input()
  set rating(value: number) {
    this._rating.set(value ?? 0);
  }

  get rating(): number {
    return this._rating();
  }

  readonly starStates = computed<ProductCardStarState[]>(() =>
    Array.from({ length: 5 }, (_, index) =>
      this._rating() >= index + 1 ? 'filled' : 'empty',
    ),
  );

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.favoriteToggle.emit(this.productId);
  }

  onAddToCartClick(event: Event): void {
    event.stopPropagation();
    if (this.badge !== 'out-of-stock') {
      this.addToCart.emit(this.productId);
    }
  }

  onPreviewClick(event: Event): void {
    event.stopPropagation();
    this.cardClick.emit(this.productId);
  }

  onCardBodyClick(): void {
    this.cardClick.emit(this.productId);
  }
}
