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
import { CartSummaryComponent } from "../../../../shared/components/cart-summary/cart-summary.component";
import { ProductsYouMayLikeComponent } from "../../../../shared/components/products-you-may-like/products-you-may-like.component";

@Component({
  selector: 'app-cart',
  imports: [CartItemCardComponent, SpLineComponent, RouterLink, ButtonComponent, CartSummaryComponent, ProductsYouMayLikeComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent extends AppComponentBase implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _productsService = inject(ProductsService);

  cartItems: WritableSignal<CartItem[]> = signal([]);
  removeLoading: WritableSignal<string | null> = signal(null);

  subtotal: WritableSignal<number> = signal(0);
  total: WritableSignal<number> = signal(0);

  icons = icons

  getCartItems(): void {
    this._cartService.getCartItems()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.cartItems.set(res.payload.cartItems);
          this.handlepriceWithDiscount(this.cartItems());
          this.subtotal.set(0);
          this.total.set(0);
          this.handleTotals(this.cartItems());
        },
        error: () => {
        }
      })
  }

  handlepriceWithDiscount(cartItems: CartItem[]): void {
    cartItems.map((item) => {
      this._productsService.getPrice(item.product)
    })
  }

  handleTotals(cartItems: CartItem[]): void {
    if (cartItems.length === 0) {
      this.subtotal.set(0);
      this.total.set(0);
    } else {
      cartItems.map((item) => {
        this.subtotal.update((value) => value + Number(item.product.price) * Number(item.quantity));
        this.total.update((value) => value + Number(item.product.priceWithDiscount) * Number(item.quantity));
      })
    }
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
  }
}
