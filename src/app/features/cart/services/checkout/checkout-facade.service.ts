import { Service, signal } from "@angular/core";
import { AppComponentBase } from "../../../../shared/app-component-base";

@Service()
export class CheckoutFacadeService extends AppComponentBase {
    currentStep = signal<number>(0);
}