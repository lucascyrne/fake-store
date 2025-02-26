import Pageable, { Pagination } from '@/types/Pageable';
import { createContext, Dispatch, SetStateAction } from 'react';
import { Product, ProductsFilters, SearchProducts } from './product-model';

export type ProductContext = {
  loading: Record<string, boolean>;
  allProducts: Pageable<Product> | null;
  featuredProducts: Product[] | null;
  productDetails?: Product;
  setProductDetails: Dispatch<SetStateAction<undefined | Product>>;
  searchProducts: (searchProducts: SearchProducts, page: Pagination) => () => void;
  getProducts: (filters?: ProductsFilters) => Promise<Product[]>;
  getProductById: (id: number) => () => void;
  updateProduct: (id: number, product: Partial<Product>) => Promise<() => void>;
  deleteProduct: (id: number) => Promise<() => void>;
  getCategories: () => Promise<string[]>;
  resetProductDetails: () => void;
};

// Criando um contexto inicial com valores padrão para evitar o uso de 'any'
const defaultContext: ProductContext = {
  loading: {},
  allProducts: null,
  featuredProducts: null,
  productDetails: undefined,
  setProductDetails: () => {},
  searchProducts: () => () => {},
  getProducts: () => Promise.resolve([]),
  getProductById: () => () => {},
  updateProduct: () => Promise.resolve(() => {}),
  deleteProduct: () => Promise.resolve(() => {}),
  getCategories: () => Promise.resolve([]),
  resetProductDetails: () => {}
};

const productContext = createContext<ProductContext>(defaultContext);

export default productContext; 