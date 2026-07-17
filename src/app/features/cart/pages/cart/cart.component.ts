import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { InputComponent } from "reusable-components";
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { RouterLink } from "@angular/router";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CartItemCardComponent, TranslatePipe, InputComponent, SpLineComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);

  cartItems: WritableSignal<CartItem[]> = signal([]);
  removeLoading: WritableSignal<string | null> = signal(null);

  getCartItems(): void {
    this._cartService.getCartItems()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => this.cartItems.set(res.payload.cartItems),
        error: () => {
        }
      })
  }

  removeCartItem(id: string): void {
    this.removeLoading.set(id);
    this._cartService.removeCartItem(id)
      .pipe(finalize(() => this.removeLoading.set(null)), takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.getCartItems();
        },
        error: () => {
        }
      })
  }

  readonly subtotal = 250;
  readonly total = 125;

  onRemoveItem(itemId: string): void {
    this.removeCartItem(itemId);
  }

  onIncreaseQuantity(itemId: string): void {
    console.log('Increase quantity:', itemId);
  }

  onDecreaseQuantity(itemId: string): void {
    console.log('Decrease quantity:', itemId);
  }

  ngOnInit(): void {
    this.getCartItems();
  }
}
