import { Component, computed, inject, input, signal, WritableSignal } from '@angular/core';
import { InputComponent, ButtonComponent } from "reusable-components";
import { AppComponentBase } from '../../app-component-base';
import { DecimalPipe } from '@angular/common';
import { SpLineComponent } from "../sp-line/sp-line.component";
import { CartFacadeService } from '../../../features/cart/services/cart/cart-facade.service';
import { RouterLink } from "@angular/router";
import { CheckoutFacadeService } from '../../../features/cart/services/cart/checkout-facade.service';

@Component({
  selector: 'app-cart-summary',
  imports: [InputComponent, DecimalPipe, SpLineComponent, ButtonComponent, RouterLink],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent extends AppComponentBase {
  private readonly _cartFacadeService = inject(CartFacadeService);
  private readonly _checkoutFacadeService = inject(CheckoutFacadeService);

  currentStep = this._checkoutFacadeService.currentStep;

  subtotal = this._cartFacadeService.subtotal
  total = this._cartFacadeService.total
}
