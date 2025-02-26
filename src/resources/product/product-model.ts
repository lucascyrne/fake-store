import { Product as BaseProduct } from '@/types/product.types';

export const SortOrderConst = ['asc', 'desc'] as const;
export type SortOrderType = (typeof SortOrderConst)[number];

export type Product = BaseProduct;

export interface SearchProducts {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: SortOrderType;
}

export interface ProductsFilters {
  limit?: number;
  page?: number;
  order?: SortOrderType;
  orderBy?: string;
  category?: string;
  offset?: number;
} 