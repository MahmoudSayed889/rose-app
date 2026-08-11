import { MainResponse } from '../../models/main-response';
import { Metadata } from '../../models/metadata';

export interface Category {
  id: string;
  title: string;
  image: string;
  _count: { products: number };
}

export type CategoriesList = MainResponse<CategoriesListPayload>;

export interface CategoriesListPayload {
  data: Category[];
  metadata: Metadata;
}
