import { Component, inject } from '@angular/core';
import { CheckoutFacadeService } from '../../../services/cart/checkout-facade.service';
import { Router } from '@angular/router';
import { ButtonComponent } from 'reusable-components';
import { icons } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { SpLineComponent } from '../../../../../shared/components/sp-line/sp-line.component';
import { AppComponentBase } from '../../../../../shared/app-component-base';

@Component({
  selector: 'app-shipping-address',
  imports: [
    ButtonComponent,
    TranslatePipe,
    SpLineComponent
  ],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss',
})
export class ShippingAddressComponent extends AppComponentBase {

  private readonly _checkoutFacadeService = inject(CheckoutFacadeService)
  private readonly _router = inject(Router)

  icons = icons
  
  next() {
    this._checkoutFacadeService.currentStep.set(2)
    this._router.navigate(['/purchase/checkout/payment-method'])
  }
}
