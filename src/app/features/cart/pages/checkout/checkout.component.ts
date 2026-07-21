import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { CheckoutFacadeService } from '../../services/checkout/checkout-facade.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [
    RouterOutlet,
    StepperModule,
    NgClass
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {

  private _checkoutFacadeService = inject(CheckoutFacadeService)
  private readonly _router = inject(Router)

  currentStep = this._checkoutFacadeService.currentStep;

  ngOnInit() {
    this._checkoutFacadeService.currentStep.set(1)
    this._router.navigate(['/purchase/checkout'])
  }

}
