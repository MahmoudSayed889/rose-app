import { Component, inject, OnInit, signal } from '@angular/core';
import { CheckoutFacadeService } from '../../../services/checkout/checkout-facade.service';
import { Router } from '@angular/router';
import { ButtonComponent } from 'reusable-components';
import { icons, LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { SpLineComponent } from '../../../../../shared/components/sp-line/sp-line.component';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { ListboxModule } from 'primeng/listbox';
import { Address } from '../../../models/checkout/addresses';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { AddressService } from '../../../services/checkout/address.service';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';

@Component({
  selector: 'app-shipping-address',
  imports: [
    ButtonComponent,
    TranslatePipe,
    SpLineComponent,
    ListboxModule,
    FormsModule,
    LucideAngularModule,
    DividerModule,
    AddressDialogComponent
  ],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss',
})
export class ShippingAddressComponent extends AppComponentBase implements OnInit {

  private readonly _checkoutFacadeService = inject(CheckoutFacadeService)
  private readonly _addressService = inject(AddressService)
  private readonly _router = inject(Router)

  addresses = this._addressService.addresses
  selectedAddress!: Address;
  visible = signal<boolean>(false)

  icons = icons
  
  ngOnInit(): void {
    this._checkoutFacadeService.currentStep.set(1)
    this.getAddresses()
  }

  getAddresses() {
    this._addressService.getAddresses().subscribe({
      next: (res) => {
        this._addressService.addresses.set(res.payload.addresses)
      }
    })
  }

  showDialog() {
    this.visible.set(true);
  }

  afterHideDialog() {
    this.getAddresses()
  }

  next() {
    this._checkoutFacadeService.currentStep.set(2)
    this._router.navigate(['/purchase/checkout/payment-method'])
  }
}
