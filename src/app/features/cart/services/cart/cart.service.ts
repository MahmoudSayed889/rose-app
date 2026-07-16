import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CartEndPoints } from '../../models/CartEndPoints';
import { Observable } from 'rxjs';
import { GetCartItemsResponse } from '../../models/cart.interface';

@Service()
export class CartService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _CartEndPoints = inject(CartEndPoints);

    getCartItems(): Observable<GetCartItemsResponse> {
        return this._httpClient.get<GetCartItemsResponse>(this._CartEndPoints.GetCartItems);
    }
}
