export interface GetCartItemsResponse {
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

export interface Product {
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
  subCategoryId: null;
  immutable: boolean;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  subCategory: null;
}

export interface Category {
  id: string;
  title: string;
}
