import axios, { AxiosError, CancelTokenSource, AxiosResponse } from 'axios';
import { Product, ProductsFilters, SearchProducts } from './product-model';
import { Pagination } from '@/types/Pageable';

const API_URL = 'https://fakestoreapi.com';

type ServiceResponse<T> = {
  promise: Promise<T>;
  abort: () => void;
};

class ProductService {
  getProducts = (filters: ProductsFilters = {}): ServiceResponse<AxiosResponse<Product[]>> => {
    let url = `${API_URL}/products`;
    
    if (filters.category) {
      url = `${API_URL}/products/category/${filters.category}`;
    }
    
    const params: Record<string, string> = {};
    
    if (filters.limit) {
      params.limit = filters.limit.toString();
    }
    
    if (filters.order) {
      params.sort = filters.order;
    }
    
    try {
      const source = axios.CancelToken.source();
      
      const promise = axios.get(url, {
        cancelToken: source.token,
        params,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      return {
        promise,
        abort: () => source.cancel()
      };
    } catch (error) {
      return {
        promise: Promise.reject(error),
        abort: () => {}
      };
    }
  };
  
  getProductById = (id: number): ServiceResponse<any> => {
    try {
      const source = axios.CancelToken.source();
      
      const promise = axios.get(`${API_URL}/products/${id}`, {
        cancelToken: source.token
      });
      
      return {
        promise,
        abort: () => source.cancel()
      };
    } catch (error) {
      return {
        promise: Promise.reject(error),
        abort: () => {}
      };
    }
  };
  
  getCategories = (): ServiceResponse<any> => {
    try {
      const source = axios.CancelToken.source();
      
      const promise = axios.get(`${API_URL}/products/categories`, {
        cancelToken: source.token
      });
      
      return {
        promise,
        abort: () => source.cancel()
      };
    } catch (error) {
      return {
        promise: Promise.reject(error),
        abort: () => {}
      };
    }
  };
  
  updateProduct = (id: number, product: Partial<Product>): ServiceResponse<any> => {
    try {
      const source = axios.CancelToken.source();
      
      const promise = axios.put(`${API_URL}/products/${id}`, product, {
        cancelToken: source.token,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return {
        promise,
        abort: () => source.cancel()
      };
    } catch (error) {
      return {
        promise: Promise.reject(error),
        abort: () => {}
      };
    }
  };
  
  deleteProduct = (id: number): ServiceResponse<any> => {
    try {
      const source = axios.CancelToken.source();
      
      const promise = axios.delete(`${API_URL}/products/${id}`, {
        cancelToken: source.token
      });
      
      return {
        promise,
        abort: () => source.cancel()
      };
    } catch (error) {
      return {
        promise: Promise.reject(error),
        abort: () => {}
      };
    }
  };
  
  searchProducts = (search: SearchProducts, pagination: Pagination): ServiceResponse<any> => {
    const { query, category, minPrice, maxPrice, sortBy, sortOrder } = search;
    const { page = 1, size = 10 } = pagination;
    
    let url = `${API_URL}/products?limit=${size}`;
    
    if (category) {
      url = `${API_URL}/products/category/${category}`;
    }
    
    if (sortBy && sortOrder) {
      url += `&sort=${sortBy}&order=${sortOrder}`;
    }
    
    try {
      const source = axios.CancelToken.source();
      
      const promise = axios.get(url, {
        cancelToken: source.token
      }).then(response => {
        let products = response.data;
        
        // Filtragem no cliente já que a API não suporta todos os filtros
        if (query) {
          const searchLower = query.toLowerCase();
          products = products.filter((product: Product) => 
            product.title.toLowerCase().includes(searchLower) || 
            product.description.toLowerCase().includes(searchLower)
          );
        }
        
        if (minPrice !== undefined) {
          products = products.filter((product: Product) => product.price >= minPrice);
        }
        
        if (maxPrice !== undefined) {
          products = products.filter((product: Product) => product.price <= maxPrice);
        }
        
        // Paginação manual
        const start = (page - 1) * size;
        const end = start + size;
        const paginatedProducts = products.slice(start, end);
        
        return {
          data: {
            content: paginatedProducts,
            totalElements: products.length,
            totalPages: Math.ceil(products.length / size),
            size,
            number: page,
            first: page === 1,
            last: page >= Math.ceil(products.length / size)
          }
        };
      });
      
      return {
        promise,
        abort: () => source.cancel()
      };
    } catch (error) {
      return {
        promise: Promise.reject(error),
        abort: () => {}
      };
    }
  };
}

export const productService = new ProductService();

export default ProductService; 