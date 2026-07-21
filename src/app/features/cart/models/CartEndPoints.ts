import { inject, Injectable } from "@angular/core";
import { AUTH_API_URL } from "auth-library";

@Injectable({
  providedIn: 'root'
})

export class CartEndPoints {
  private readonly _baseURL = inject(AUTH_API_URL);

  readonly GetCartItems = `${this._baseURL}/api/cart`;
  readonly AddItemToCart = `${this._baseURL}/api/cart`;
  readonly ClearCart = `${this._baseURL}/api/cart`;
  readonly UpdateCartItemQuantity = (id: string) => `${this._baseURL}/api/cart/${id}`;
  readonly RemoveItemFromCart = (id: string) => `${this._baseURL}/api/cart/${id}`;
}