import { MainResponse } from '../../../../../shared/models/main-response';
import { Metadata } from '../../../../../shared/models/metadata';

// Category Response Types
export type CategoryResponse = MainResponse<CategoryPayload>;

export interface CategoryPayload {
  data: Category[];
  metadata: Metadata;
}

export interface Category {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count: CategoryCount;
}

export interface CategoryCount {
  products: number;
  subCategories: number;
}

// Made with Bob
