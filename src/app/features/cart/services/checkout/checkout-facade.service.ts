import { inject, Service, signal } from "@angular/core";
import { AppComponentBase } from "../../../../shared/app-component-base";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Address } from "../../models/checkout/addresses";
import { PaymentMethod } from "../../models/checkout/payment-method";

@Service()
export class CheckoutFacadeService extends AppComponentBase {

    private readonly fb = inject(FormBuilder);

    currentStep = signal<number>(0);

    selectedAddress = signal<Address | null>(null);
    paymentMethod = signal<PaymentMethod | null>(null);
    couponCode = signal('');
    notes = signal('');
}