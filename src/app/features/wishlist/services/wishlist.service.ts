import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { ClearWishlistResponse, DeleteWishlistItemResponse, WishlistResponse } from '../models/wishlist';

@Service()
export class WishlistService {

    private _httpClient = inject(HttpClient);
    private baseUrl = inject(AUTH_API_URL);

    getWishlist(): Observable<WishlistResponse> {
        return this._httpClient.get<WishlistResponse>(`${this.baseUrl}/api/wishlist`);
    }

    clearWishlist(): Observable<ClearWishlistResponse> {
        return this._httpClient.delete<ClearWishlistResponse>(`${this.baseUrl}/api/wishlist`);
    }

    removeItem(wishlistItemId: string): Observable<DeleteWishlistItemResponse> {
        return this._httpClient.delete<DeleteWishlistItemResponse>(`${this.baseUrl}/api/wishlist/${wishlistItemId}`);
    }
}
