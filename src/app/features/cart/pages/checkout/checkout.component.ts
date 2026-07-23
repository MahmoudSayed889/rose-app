import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { CheckoutFacadeService } from '../../services/checkout/checkout-facade.service';
import { NgClass } from '@angular/common';
import { ButtonComponent } from 'reusable-components';
import { TranslatePipe } from '@ngx-translate/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { SpLineComponent } from '../../../../shared/components/sp-line/sp-line.component';
import { icons } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../../orders/services/orders.service';
import { CreateOrderRequest } from '../../../orders/models/orders';

@Component({
  selector: 'app-checkout',
  imports: [
    RouterOutlet,
    StepperModule,
    NgClass,
    ButtonComponent,
    TranslatePipe,
    SpLineComponent,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent extends AppComponentBase implements OnInit {

  private readonly _checkoutFacadeService = inject(CheckoutFacadeService)
  private readonly _ordersService = inject(OrdersService)
  private readonly _router = inject(Router)

  currentStep = this._checkoutFacadeService.currentStep;

  icons = icons

  ngOnInit() {
    this._checkoutFacadeService.currentStep.set(1)
    this._router.navigate(['/purchase/checkout'])
  }

  next() {
    this._checkoutFacadeService.currentStep.set(2)
    this._router.navigate(['/purchase/checkout/payment-method'])
  }

  back() {
    this._checkoutFacadeService.currentStep.set(1)
    this._router.navigate(['/purchase/checkout/shipping-address'])
  }

  inValidData(): boolean {
    if (
      (this._checkoutFacadeService.selectedAddress() == null && this.currentStep() == 1) ||
      (this._checkoutFacadeService.paymentMethod() == null && this.currentStep() == 2)
    ) {
      return true
    }

    return false
  }

  afterSubmited() {
    this._checkoutFacadeService.selectedAddress.set(null)
    this._checkoutFacadeService.paymentMethod.set(null)
    this._checkoutFacadeService.couponCode.set('')
    this._checkoutFacadeService.notes.set('')
  }

  checkout() {
    const dataToSend = {
      addressId: this._checkoutFacadeService.selectedAddress()?.id,
      paymentMethod: this._checkoutFacadeService.paymentMethod()?.method,
      couponCode: this._checkoutFacadeService.couponCode(),
      notes: this._checkoutFacadeService.notes(),
    } as CreateOrderRequest

    this._ordersService.createOrder(dataToSend).subscribe({
      next: () => {
        this.afterSubmited()
        this._router.navigate(['/orders'])
      }
    })
  }
}
