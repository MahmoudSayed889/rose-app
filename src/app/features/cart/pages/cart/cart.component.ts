import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputComponent, ButtonComponent } from "reusable-components";
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { RouterLink } from "@angular/router";
import { finalize } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemCardComponent, TranslatePipe, InputComponent, SpLineComponent, RouterLink, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _spinner = inject(NgxSpinnerService);
  private readonly _productsService = inject(ProductsService);

  cartItems: WritableSignal<CartItem[]> = signal([]);
  removeLoading: WritableSignal<string | null> = signal(null);

  subtotal: WritableSignal<number> = signal(0);
  total: WritableSignal<number> = signal(0);

  getCartItems(): void {
    this._spinner.show();
    this._cartService.getCartItems()
      .pipe(finalize(() => this._spinner.hide()), takeUntilDestroyed(this._destroyRef))
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
    cartItems.map((item) => {
      this.subtotal.update((value) => value + Number(item.product.price));
      this.total.update((value) => value + Number(item.product.priceWithDiscount));
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
