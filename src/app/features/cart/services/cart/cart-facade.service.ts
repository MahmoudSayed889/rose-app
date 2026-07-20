import { inject, Service, signal, WritableSignal } from "@angular/core";
import { CartService } from "./cart.service";
import { AppComponentBase } from "../../../../shared/app-component-base";
import { AddToCartREQ, CartItem } from "../../models/cart.interface";
import { ProductsService } from "../../../products/services/products.service";

@Service()
export class CartFacadeService extends AppComponentBase {
    private readonly _cartService = inject(CartService);
    private readonly _productsService = inject(ProductsService);

    readonly cartItems = signal<CartItem[]>([]);
    readonly subtotal: WritableSignal<number> = signal(0);
    readonly total: WritableSignal<number> = signal(0);

    addToCart(data: AddToCartREQ): void {
        this._cartService.addToCart(data).subscribe({
            next: () => {
                this._toastService.toaster('success', 'Added to cart')
            },
        });
    }

    handlepriceWithDiscount(cartItems: CartItem[]): void {
        cartItems.map((item) => {
            this._productsService.getPrice(item.product)
        })
    }

    handleTotals(cartItems: CartItem[]): void {
        this.subtotal.set(0);
        this.total.set(0);

        if (cartItems.length === 0) {
            return
        }

        cartItems.map((item) => {
            this.subtotal.update((value) => value + Number(item.product.price) * Number(item.quantity));
            this.total.update((value) => value + Number(item.product.priceWithDiscount) * Number(item.quantity));
        })
    }
}