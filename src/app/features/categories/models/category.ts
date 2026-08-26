import { MainResponse } from "../../../shared/models/main-response"
import { Metadata } from "../../../shared/models/metadata"

export type CategoriesList = MainResponse<CategoriesListPayload>;

export interface CategoriesListPayload {
  data: Category[];
  metadata: Metadata;
}

export type SingleCategory = MainResponse<SingleCategoryPayload>;

export interface SingleCategoryPayload {
  category: Category;
}

export interface Category {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  subCategories: SubCategory[]
  _count: Count
}

export interface SubCategory {
  id: string
  title: string
}

export interface Count {
  products: number
}
