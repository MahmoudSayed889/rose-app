import { DestroyRef, inject, Service, signal, WritableSignal } from "@angular/core";
import { CartService } from "./cart.service";
import { AppComponentBase } from "../../../../shared/app-component-base";
import { AddToCartREQ, CartItem } from "../../models/cart.interface";
import { ProductsService } from "../../../products/services/products.service";
import { CouponList } from "../../models/coupon";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AUTH_API_URL } from "auth-library";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HelperService } from "../../../../shared/services/helper.service";
import { ExternalParams } from "../../../../shared/models/external-params";

@Service()
export class CartFacadeService extends AppComponentBase {
    private readonly _httpClient = inject(HttpClient);
    private readonly _baseURL = inject(AUTH_API_URL);

    private readonly _destroyRef = inject(DestroyRef);
    private readonly _cartService = inject(CartService);
    private readonly _productsService = inject(ProductsService);
    private readonly _helperService = inject(HelperService)


    readonly cartItems = signal<CartItem[]>([]);
    readonly subtotal: WritableSignal<number> = signal(0);
    readonly total: WritableSignal<number> = signal(0);

    addToCart(data: AddToCartREQ): void {
        this._cartService.addToCart(data).subscribe({
            next: () => {
                this.getCartItems()
                this._toastService.toaster('success', 'Added to cart')
            },
        });
    }

    getCartItems(): void {
        this._cartService.getCartItems()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: (res) => {
                    this.cartItems.set(res.payload.cartItems);

                    this.handlepriceWithDiscount(this.cartItems());
                    this.handleTotals(this.cartItems());
                },
                error: () => {
                }
            })
    }

    getCoupons(params?: ExternalParams): Observable<CouponList> {
        return this._httpClient.get<CouponList>(`${this._baseURL}/api/coupons`, { params: this._helperService.createParams(params) });
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