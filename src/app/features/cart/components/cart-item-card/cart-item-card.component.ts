import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CartItem } from '../../models/cart.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from "reusable-components";

@Component({
  selector: 'app-cart-item-card',
  imports: [DecimalPipe, TranslatePipe, ButtonComponent],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss',
})
export class CartItemCardComponent {
  item = input.required<CartItem>();
  removeLoading = input<boolean>(false);
  removeDisabled = input<boolean>(false);

  remove = output<string>();
  increaseQuantity = output<string>();
  decreaseQuantity = output<string>();

  onRemove(): void {
    this.remove.emit(this.item().id);
  }

  onIncreaseQuantity(): void {
    this.increaseQuantity.emit(this.item().id);
  }

  onDecreaseQuantity(): void {
    this.decreaseQuantity.emit(this.item().id);
  }
}
