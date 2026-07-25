import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from 'reusable-components';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { CheckoutFacadeService } from '../../../services/checkout/checkout-facade.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ListboxModule } from 'primeng/listbox';
import { PaymentMethod } from '../../../models/checkout/payment-method';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  imports: [
    ListboxModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss',
})
export class PaymentMethodComponent extends AppComponentBase implements OnInit {

  private readonly _checkoutFacadeService = inject(CheckoutFacadeService)

  paymentMethods = signal<PaymentMethod[]>([])
  selectedPaymentMethod = this._checkoutFacadeService.paymentMethod;


  ngOnInit(): void {
    this._checkoutFacadeService.currentStep.set(2)

    this.paymentMethods.set([
      {
        imgSrc: 'assets/imgs/cash.png',
        title: 'Cash on Delivery',
        subTitle: 'You’ll pay in cash when your order is delivered',
        method: 'CASH_ON_DELIVERY',
      },
      {
        imgSrc: 'assets/imgs/credit.png',
        title: 'Credit Card',
        subTitle: 'You’ll be securely redirected to Stripe to complete your payment',
        method: 'CREDIT_CARD',
      },
    ])
  }
}
