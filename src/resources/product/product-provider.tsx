"use client"

import Pageable, { Pagination } from '@/types/Pageable';
import { FC, ReactNode, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import productContext, { ProductContext } from './product-context';
import { Product, ProductsFilters, SearchProducts } from './product-model';
import { productService } from './product.service';

const initialLoadingObject = {
  searchProducts: false,
  getProducts: false,
  getProductById: false,
  updateProduct: false,
  deleteProduct: false,
  getCategories: false
};

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [productDetails, setProductDetails] = useState<undefined | Product>(undefined);
  const [allProducts, setAllProducts] = useState<Pageable<Product> | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(initialLoadingObject);
  const [allProductsCache, setAllProductsCache] = useState<Product[]>([]);

  const toggleLoading = useCallback((key: keyof typeof loading, state: boolean) => {
    setLoading(prev => ({ ...prev, [key]: state }));
  }, []);

  const sortProducts = useCallback((products: Product[], orderBy?: string, order?: string) => {
    if (!products || products.length === 0) return [];
    
    let sorted = [...products];
    
    if (orderBy === 'price' && order) {
      console.log('Ordenando produtos por preço:', order);
      sorted = sorted.sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        
        return order === 'asc' 
          ? priceA - priceB 
          : priceB - priceA;
      });
    }
    
    return sorted;
  }, []);

  const searchProducts = useCallback(
    (search: SearchProducts, page: Pagination) => {
      toggleLoading('searchProducts', true);

      const { promise, abort } = productService.searchProducts(search, page);

      promise
        ?.then(response => {
          toggleLoading('searchProducts', false);
          
          const sortedProducts = sortProducts(
            response.data.content, 
            search.sortBy, 
            search.sortOrder
          );
          
          setAllProducts({
            ...response.data,
            content: sortedProducts
          });
        })
        .catch(err => {
          if (err && err.name === 'CanceledError') return;
          toggleLoading('searchProducts', false);
          toast.error('Erro ao buscar produtos');
          console.error(err);
        });

      return abort;
    },
    [toggleLoading, sortProducts]
  );

  const getProducts = useCallback(
    async (filters: ProductsFilters = {}): Promise<Product[]> => {
      toggleLoading('getProducts', true);
      
      try {
        // Se já temos produtos em cache e não há filtro de categoria, usar o cache
        let productsToProcess: Product[] = [];
        
        // Se temos um filtro de categoria ou o cache está vazio, buscar da API
        if (filters.category || allProductsCache.length === 0) {
          const apiFilters = { ...filters };
          // Remover parâmetros de paginação que a API não suporta
          delete apiFilters.page;
          delete apiFilters.offset;
          
          const { promise } = productService.getProducts(apiFilters);
          const response = await promise;
          productsToProcess = response.data;
          
          // Atualizar o cache se não houver filtro de categoria
          if (!filters.category) {
            setAllProductsCache(response.data);
          }
        } else {
          // Usar o cache
          productsToProcess = allProductsCache;
        }
        
        // Aplicar filtros no cliente
        let filteredProducts = [...productsToProcess];
        
        // Aplicar ordenação
        filteredProducts = sortProducts(
          filteredProducts,
          filters.orderBy,
          filters.order
        );
        
        // Atualizar produtos em destaque
        if (!filters.category) {
          const featured = productsToProcess.filter((p: Product) => p.rating.rate > 4.5);
          setFeaturedProducts(featured);
        }
        
        // Aplicar paginação
        let paginatedProducts = filteredProducts;
        if (filters.page !== undefined && filters.limit) {
          const startIndex = (filters.page - 1) * filters.limit;
          paginatedProducts = filteredProducts.slice(startIndex, startIndex + filters.limit);
        }
        
        // Atualizar o estado allProducts com informações de paginação
        setAllProducts({
          content: paginatedProducts,
          totalElements: filteredProducts.length,
          totalPages: filters.limit ? Math.ceil(filteredProducts.length / filters.limit) : 1,
          size: filters.limit || filteredProducts.length,
          number: filters.page || 1,
          numberOfElements: paginatedProducts.length,
          first: filters.page === 1 || false,
          last: filters.limit ? 
            (filters.page || 1) >= Math.ceil(filteredProducts.length / filters.limit) : 
            true
        });
        
        toggleLoading('getProducts', false);
        console.log('Produtos paginados:', paginatedProducts);
        return paginatedProducts;
      } catch (err) {
        if (err && typeof err === 'object' && 'name' in err && err.name === 'CanceledError') return [];
        toggleLoading('getProducts', false);
        toast.error('Erro ao buscar produtos');
        console.error(err);
        return [];
      }
    },
    [toggleLoading, sortProducts, allProductsCache]
  );

  const getProductById = useCallback(
    (id: number) => {
      toggleLoading('getProductById', true);

      const { promise, abort } = productService.getProductById(id);

      promise
        ?.then(response => {
          toggleLoading('getProductById', false);
          setProductDetails(response.data);
        })
        .catch(err => {
          if (err.name === 'CanceledError') return;
          toggleLoading('getProductById', false);
          toast.error('Erro ao buscar detalhes do produto');
          console.error(err);
        });

      return abort;
    },
    [toggleLoading]
  );

  const updateProduct = useCallback(
    async (id: number, product: Partial<Product>) => {
      toggleLoading('updateProduct', true);

      const { promise, abort } = productService.updateProduct(id, product);

      try {
        const response = await promise;
        toggleLoading('updateProduct', false);
        
        setAllProducts(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            content: prev.content.map(p => (p.id === id ? { ...p, ...product } : p))
          };
        });
        
        toast.success('Produto atualizado com sucesso!');
        return () => {};
      } catch (err: any) {
        if (err.name === 'CanceledError') return () => {};
        toggleLoading('updateProduct', false);
        toast.error('Erro ao atualizar produto');
        console.error(err);
        throw err;
      }
    },
    [toggleLoading]
  );

  const deleteProduct = useCallback(
    async (id: number) => {
      toggleLoading('deleteProduct', true);

      const { promise, abort } = productService.deleteProduct(id);

      try {
        await promise;
        toggleLoading('deleteProduct', false);
        
        setAllProducts(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            content: prev.content.filter(p => p.id !== id)
          };
        });
        
        toast.success('Produto excluído com sucesso!');
        return () => {};
      } catch (err: any) {
        if (err.name === 'CanceledError') return () => {};
        toggleLoading('deleteProduct', false);
        toast.error('Erro ao excluir produto');
        console.error(err);
        throw err;
      }
    },
    [toggleLoading]
  );

  const getCategories = useCallback(async (): Promise<string[]> => {
    toggleLoading('getCategories', true);

    const { promise, abort } = productService.getCategories();

    try {
      const response = await promise;
      toggleLoading('getCategories', false);
      return response.data;
    } catch (err: any) {
      if (err.name === 'CanceledError') return [];
      toggleLoading('getCategories', false);
      toast.error('Erro ao buscar categorias');
      console.error(err);
      return [];
    }
  }, [toggleLoading]);

  const resetProductDetails = useCallback(() => {
    setProductDetails(undefined);
  }, []);

  const value: ProductContext = {
    loading,
    allProducts,
    featuredProducts,
    productDetails,
    setProductDetails,
    searchProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getCategories,
    resetProductDetails
  };

  return <productContext.Provider value={value}>{children}</productContext.Provider>;
};

export default ProductProvider; 