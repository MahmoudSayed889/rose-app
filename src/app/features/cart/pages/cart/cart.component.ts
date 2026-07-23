import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CartService } from '../../services/cart/cart.service';
import { CartItem, UpdateCartItemQuantityREQ } from '../../models/cart.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from "reusable-components";
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { RouterLink } from "@angular/router";
import { finalize } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { icons } from 'lucide-angular';
import { CartFacadeService } from '../../services/cart/cart-facade.service';
import { CheckoutFacadeService } from '../../services/cart/checkout-facade.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemCardComponent, SpLineComponent, RouterLink, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent extends AppComponentBase implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _cartFacadeService = inject(CartFacadeService);
  private readonly _checkoutFacadeService = inject(CheckoutFacadeService);

  cartItems = this._cartFacadeService.cartItems;
  removeLoading: WritableSignal<string | null> = signal(null);

  icons = icons

  getCartItems(): void {
    this._cartService.getCartItems()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this._cartFacadeService.cartItems.set(res.payload.cartItems);

          this._cartFacadeService.handlepriceWithDiscount(this.cartItems());
          this._cartFacadeService.handleTotals(this.cartItems());
        },
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

  clearCart(): void {
    this._cartService.clearCart()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.getCartItems();
        },
        error: (err) => console.log(err)
      })
  }

  UpdateCartItemQuantity(id: string, quantity: UpdateCartItemQuantityREQ): void {
    this._cartService.UpdateCartItemQuantity(id, quantity)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.getCartItems();
        }
      })
  }

  onRemoveItem(itemId: string): void {
    this.removeCartItem(itemId);
  }

  getItemQuantity(itemId: string): number {
    let quantity = 0;
    this.cartItems().map(item => {
      if (item.id === itemId)
        quantity = item.quantity
    })
    return quantity;
  }

  onIncreaseQuantity(itemId: string): void {
    const quantity = {
      quantity: this.getItemQuantity(itemId) + 1
    };
    this.UpdateCartItemQuantity(itemId, quantity);
  }

  onDecreaseQuantity(itemId: string): void {
    const quantity = {
      quantity: this.getItemQuantity(itemId) - 1
    };
    this.UpdateCartItemQuantity(itemId, quantity);
  }

  ngOnInit(): void {
    this.getCartItems();
    this._checkoutFacadeService.currentStep.set(0)
  }
}
