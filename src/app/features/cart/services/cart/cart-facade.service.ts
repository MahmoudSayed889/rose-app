import { inject, Service, signal } from "@angular/core";
import { CartService } from "./cart.service";
import { AppComponentBase } from "../../../../shared/app-component-base";
import { AddToCartREQ } from "../../models/cart.interface";

@Service()
export class CartFacadeService extends AppComponentBase {
    private _cartApi = inject(CartService);

    addToCart(data: AddToCartREQ): void {
        this._cartApi.addToCart(data).subscribe({
            next: () => {
                this._toastService.toaster('success', 'Added to cart')
            },
        });
    }


}