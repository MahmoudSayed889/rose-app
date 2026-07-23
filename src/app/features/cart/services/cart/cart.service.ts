import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CartEndPoints } from '../../models/CartEndPoints';
import { Observable } from 'rxjs';
import { AddToCartREQ, AddToCartRES, GetCartItemsRES, RemoveCartItemsRES, UpdateCartItemQuantityREQ } from '../../models/cart.interface';

@Service()
export class CartService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _CartEndPoints = inject(CartEndPoints);

    getCartItems(): Observable<GetCartItemsRES> {
        return this._httpClient.get<GetCartItemsRES>(this._CartEndPoints.GetCartItems);
    }

    removeCartItem(id: string): Observable<RemoveCartItemsRES> {
        return this._httpClient.delete<RemoveCartItemsRES>(this._CartEndPoints.RemoveItemFromCart(id));
    }

    clearCart(): Observable<RemoveCartItemsRES> {
        return this._httpClient.delete<RemoveCartItemsRES>(this._CartEndPoints.ClearCart);
    }

    addToCart(data: AddToCartREQ): Observable<AddToCartRES> {
        return this._httpClient.post<AddToCartRES>(this._CartEndPoints.AddItemToCart, data);
    }

    UpdateCartItemQuantity(id: string, quantity: UpdateCartItemQuantityREQ): Observable<AddToCartRES> {
        return this._httpClient.patch<AddToCartRES>(this._CartEndPoints.UpdateCartItemQuantity(id), quantity);
    }
}
