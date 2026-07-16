import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InputComponent } from "reusable-components";
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [CartItemCardComponent, TranslatePipe, InputComponent, SpLineComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _spinner = inject(NgxSpinnerService);

  cartItems: WritableSignal<CartItem[]> = signal([]);

  getCartItems(): void {
    this._spinner.show();
    this._cartService.getCartItems()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.cartItems.set(res.payload.cartItems);
          console.log(this.cartItems());
          this._spinner.hide();
        },
        error: (err) => {
          console.log(err);
          this._spinner.hide();
        }
      })
  }

  readonly subtotal = 250;
  readonly total = 125;

  onRemoveItem(itemId: number): void {
    console.log('Remove item:', itemId);
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
