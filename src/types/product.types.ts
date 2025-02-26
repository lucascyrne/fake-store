export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsFilters {
  limit?: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
  category?: string;
  page?: number;
  offset?: number;
} 