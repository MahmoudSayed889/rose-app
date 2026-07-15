import { Component, computed, DOCUMENT, inject, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from 'reusable-components';
import { WishlistProduct } from '../../models/wishlist';

@Component({
  selector: 'app-wishlist-card',
  imports: [TranslatePipe, DecimalPipe, ButtonComponent],
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.scss',
})
export class WishlistCardComponent {
  private _router = inject(Router);
  private readonly _document = inject(DOCUMENT);

  product = input.required<WishlistProduct>();

  deleteItem = output<string>();
  addToCart = output<string>();

  isRtl = computed(
    () =>
      this._document.documentElement.dir === 'rtl' ||
      this._document.documentElement.lang === 'ar',
  );

  get inStock(): boolean {
    return this.product().stock > 0;
  }

  get originalPrice(): number {
    return Number(this.product().price);
  }

  get finalPrice(): number {
    const price = this.originalPrice;
    const discountType = this.product().discountType;
    const discountValue = Number(this.product().discountValue);

    if (!discountValue) return price;

    switch (discountType) {
      case 'PERCENT':
        return price - (price * discountValue) / 100;
      case 'VALUE':
        return Math.max(price - discountValue, 0);
      default:
        return price;
    }
  }

  get hasDiscount(): boolean {
    return Number(this.product().discountValue) > 0;
  }

  onDelete(): void {
    this.deleteItem.emit(this.product().id);
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product().id);
  }

  get arrowIcon(): string {
    return this.isRtl() ? 'pi-arrow-left' : 'pi-arrow-right';
  }

  onExploreSimilar(): void {
    this._router.navigate(['/products'], {
      queryParams: { categoryId: this.product().categoryId },
    });
  }
}
