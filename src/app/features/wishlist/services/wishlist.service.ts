import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
<<<<<<< HEAD
import { AddToWishlistRequest, AddToWishlistResponse, ClearWishlistResponse, DeleteWishlistItemResponse, WishlistResponse } from '../models/wishlist';
=======
import { ClearWishlistResponse, DeleteWishlistItemResponse, WishlistResponse } from '../models/wishlist';
>>>>>>> 1c8b478 (feat: product filters)

@Service()
export class WishlistService {

    private _httpClient = inject(HttpClient);
    private baseUrl = inject(AUTH_API_URL);

    getWishlist(): Observable<WishlistResponse> {
        return this._httpClient.get<WishlistResponse>(`${this.baseUrl}/api/wishlist`);
    }

<<<<<<< HEAD
    addToWishlist(productId: string): Observable<AddToWishlistResponse> {
        const body: AddToWishlistRequest = { productId };
        return this._httpClient.post<AddToWishlistResponse>(`${this.baseUrl}/api/wishlist`, body);
    }

=======
>>>>>>> 1c8b478 (feat: product filters)
    clearWishlist(): Observable<ClearWishlistResponse> {
        return this._httpClient.delete<ClearWishlistResponse>(`${this.baseUrl}/api/wishlist`);
    }

    removeItem(wishlistItemId: string): Observable<DeleteWishlistItemResponse> {
        return this._httpClient.delete<DeleteWishlistItemResponse>(`${this.baseUrl}/api/wishlist/${wishlistItemId}`);
    }
}
