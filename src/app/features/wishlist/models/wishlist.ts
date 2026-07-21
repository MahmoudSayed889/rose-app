import { MainResponse } from '../../../shared/models/main-response';
import { Category, SubCategory } from '../../products/models/product';

export type WishlistResponse = MainResponse<WishlistPayload>;

export interface WishlistPayload {
    wishlistItems: WishlistItem[];
}

export interface WishlistItem {
    id: string;
    userId: string;
    productId: string;
    createdAt: string;
    product: WishlistProduct;
}

<<<<<<< HEAD
export interface AddToWishlistRequest {
    productId: string;
}

export interface AddToWishlistResponse {
    status: boolean;
    code: number;
    payload: WishlistItem;
}

=======
>>>>>>> 1c8b478 (feat: product filters)
export interface ClearWishlistResponse {
    status: boolean;
    code: number;
    message: string;
    payload?: string;
}

export interface DeleteWishlistItemResponse {
    status: boolean;
    code: number;
    message: string;
    payload?: string;
}

export interface WishlistProduct {
    id: string;
    title: string;
    description: string;
    rating: number;
    ratings: number;
    stock: number;
    price: string;
    discountType: string;
    discountValue: string;
    cover: string;
    gallery: string;
    categoryId: string;
    subCategoryId: string;
    immutable: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    category: Category;
    subCategory: SubCategory;
}
