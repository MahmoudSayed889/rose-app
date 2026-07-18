import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputComponent, ButtonComponent, LucideIconConfig } from "reusable-components";
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { RouterLink } from "@angular/router";
import { finalize } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { Brush, BrushCleaning, LucideIconData } from 'lucide-angular';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartItemCardComponent, InputComponent, SpLineComponent, RouterLink, ButtonComponent, DecimalPipe],
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

  iconname: LucideIconData = BrushCleaning
  clearCartIcon: LucideIconConfig = {
    name: this.iconname
  }

  getCartItems(): void {
    this._cartService.getCartItems()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.cartItems.set(res.payload.cartItems);
          this.handlepriceWithDiscount(this.cartItems());
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
        this.subtotal.update((value) => value + Number(item.product.price));
        this.total.update((value) => value + Number(item.product.priceWithDiscount));
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
