import { MainResponse } from '../../../shared/models/main-response';
import { Metadata } from '../../../shared/models/metadata';

export type ProductsList = MainResponse<ProductsListPayload>;

export interface ProductsListPayload {
  data: Product[];
  metadata: Metadata;
}

export type SingleProduct = MainResponse<SingleProductPayload>;

export interface SingleProductPayload {
  product: Product;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  rating: number;
  stock: number;
  price: string;
  discountType: string;
  discountValue: string;
  cover: string;
  categoryId: string;
  subCategoryId: string | null;
  category: { id: string; title: string };
  occasions: any[];
  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
    orderItems: number;
  };
  // Optional fields used by product details
  gallery?: string;
  ratings?: number;
  immutable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  subCategory?: { id: string; title: string };
}

export interface CreateProductRequest {
  title: string;
  description: string;
  stock: number;
  price: number;
  discountType: string;
  discountValue: number;
  categoryId: string;
  cover: string;
  gallery: any[];
}

export interface DeleteProductResponse {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}
