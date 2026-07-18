import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CartEndPoints } from '../../models/CartEndPoints';
import { Observable } from 'rxjs';
import { GetCartItemsRES, RemoveCartItemsRES } from '../../models/cart.interface';

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
}
