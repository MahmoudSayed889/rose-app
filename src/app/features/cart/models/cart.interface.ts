import { Product } from "../../products/models/product";

export interface GetCartItemsRES {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface Payload {
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface RemoveCartItemsRES {
  status: boolean,
  code: number,
  message: string
}

export interface AddToCartREQ {
  productId: string,
  quantity: number
}

export interface AddToCartRES {
  status: boolean;
  code: number;
  payload: AddToCartPayload;
}

export interface AddToCartPayload {
  cartItem: CartItem;
}