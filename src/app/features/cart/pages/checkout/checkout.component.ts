import { Component, inject, OnInit, signal } from '@angular/core';
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
import { CartFacadeService } from '../../services/cart/cart-facade.service';
import { PaymentService } from '../../services/checkout/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [
    RouterOutlet,
    StepperModule,
    NgClass,
    ButtonComponent,
    TranslatePipe,
    SpLineComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent extends AppComponentBase implements OnInit {
  private readonly _checkoutFacadeService = inject(CheckoutFacadeService);
  private readonly _cartFacadeService = inject(CartFacadeService);
  private readonly _ordersService = inject(OrdersService);
  private readonly _paymentService = inject(PaymentService);
  private readonly _router = inject(Router);

  currentStep = this._checkoutFacadeService.currentStep;
  isProcessing = signal(false);

  icons = icons;

  ngOnInit() {
    this._checkoutFacadeService.currentStep.set(1);
    this._router.navigate(['/purchase/checkout']);
  }

  next() {
    this._checkoutFacadeService.currentStep.set(2);
    this._router.navigate(['/purchase/checkout/payment-method']);
  }

  back() {
    this._checkoutFacadeService.currentStep.set(1);
    this._router.navigate(['/purchase/checkout/shipping-address']);
  }

  inValidData(): boolean {
    if (
      (this._checkoutFacadeService.selectedAddress() == null && this.currentStep() == 1) ||
      (this._checkoutFacadeService.paymentMethod() == null && this.currentStep() == 2)
    ) {
      return true;
    }

    return false;
  }

  afterSubmited() {
    this._checkoutFacadeService.selectedAddress.set(null);
    this._checkoutFacadeService.paymentMethod.set(null);
    this._checkoutFacadeService.couponCode.set('');
    this._checkoutFacadeService.notes.set('');

    this._cartFacadeService.getCartItems();
  }

  checkout() {
    const dataToSend = {
      addressId: this._checkoutFacadeService.selectedAddress()?.id,
      paymentMethod: this._checkoutFacadeService.paymentMethod()?.method,
      couponCode: this._checkoutFacadeService.couponCode(),
      notes: this._checkoutFacadeService.notes(),
    } as CreateOrderRequest;

    const selectedPaymentMethod = this._checkoutFacadeService.paymentMethod()?.method;
    if (selectedPaymentMethod === 'pm_card_visa') {
      this.isProcessing.set(true);
      this._ordersService.createOrder(dataToSend).subscribe({
        next: (orderResponse) => {
          const orderId = orderResponse.payload.order.id;
          this._checkoutFacadeService.orderId.set(orderId);
          const paymentMethodId = this._checkoutFacadeService.paymentMethodId();

          if (!paymentMethodId) {
            this._toastService.toaster(
              'error',
              'Missing payment method identifier. Integrate Stripe card collection to provide a real paymentMethodId.',
            );
            this.isProcessing.set(false);
            return;
          }

          this._paymentService.createPaymentIntent({ orderId }).subscribe({
            next: (intentResponse) => {
              if (!intentResponse.status || !intentResponse.payload) {
                this._toastService.toaster('error', 'Failed to create payment intent.');
                this.isProcessing.set(false);
                return;
              }

              const paymentIntentId = intentResponse.payload;
              this._paymentService.confirmPayment({ paymentIntentId, paymentMethodId }).subscribe({
                next: (confirmResponse) => {
                  if (!confirmResponse.status) {
                    this._toastService.toaster('error', 'Payment confirmation failed.');
                    this.isProcessing.set(false);
                    return;
                  }

                  this._toastService.toaster('success', 'Payment completed successfully.');
                  this.afterSubmited();
                  this._router.navigate(['/orders']);
                  this.isProcessing.set(false);
                },
                error: () => {
                  this._toastService.toaster('error', 'Unable to confirm payment.');
                  this.isProcessing.set(false);
                },
              });
            },
            error: () => {
              this._toastService.toaster('error', 'Unable to create payment intent.');
              this.isProcessing.set(false);
            },
          });
        },
        error: () => {
          this._toastService.toaster('error', 'Unable to create order.');
          this.isProcessing.set(false);
        },
      });

      return;
    }

    this._ordersService.createOrder(dataToSend).subscribe({
      next: () => {
        this.afterSubmited();
        this._router.navigate(['/orders']);
      },
    });
  }
}
