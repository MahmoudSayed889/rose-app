import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CheckoutFacadeService } from '../../../services/checkout/checkout-facade.service';
import { ButtonComponent } from 'reusable-components';
import { icons, LucideAngularModule } from 'lucide-angular';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { AddressService } from '../../../services/checkout/address.service';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';

@Component({
  selector: 'app-shipping-address',
  imports: [
    ButtonComponent,
    ListboxModule,
    LucideAngularModule,
    DividerModule,
    AddressDialogComponent,
    FormsModule
  ],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss',
})
export class ShippingAddressComponent extends AppComponentBase implements OnInit {

  private readonly _checkoutFacadeService = inject(CheckoutFacadeService)
  private readonly _addressService = inject(AddressService)

  addresses = this._addressService.addresses
  selectedAddress = this._checkoutFacadeService.selectedAddress;
  visible = signal<boolean>(false)

  icons = icons

  ngOnInit(): void {
    this._checkoutFacadeService.currentStep.set(1)
  }

  showDialog() {
    this.visible.set(true);
  }
}
