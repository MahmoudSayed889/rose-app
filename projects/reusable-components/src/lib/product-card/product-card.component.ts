import { CurrencyPipe } from '@angular/common';
import { AuthService } from "auth-library";

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';

export type ProductCardBadge = 'new' | 'hot' | 'out of stock';
export type ProductCardStarState = 'filled' | 'empty';

@Component({
  selector: 'lib-product-card',
  imports: [
    LucideAngularModule,
    CurrencyPipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly authService = inject(AuthService);

  readonly icons = icons;
  @Input({ required: true }) productId!: string;
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) discountType!: string;
  @Input({ required: true }) discountValue!: string;
  // @Input() badge: ProductCardBadge | null = null;
  @Input() badge: ProductCardBadge[] = [];
  @Input() isFavorite = false;

  @Output() favoriteToggle = new EventEmitter<string | number>();
  @Output() addToCart = new EventEmitter<string>();
  @Output() cardClick = new EventEmitter<string | number>();

  private readonly _rating = signal(0);

  @Input()
  set rating(value: number) {
    this._rating.set(value ?? 0);
  }

  get rating(): number {
    return this._rating();
  }

  get finalPrice(): number {
    if (!this.discountValue) {
      return this.price;
    }

    switch (this.discountType) {
      case 'PERCENT':
        return this.price - (this.price * Number(this.discountValue)) / 100;

      case 'FIXED':
        return Math.max(this.price - Number(this.discountValue), 0);

      default:
        return this.price;
    }
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
    
    if (!this.badge.includes('out of stock')) {      
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
