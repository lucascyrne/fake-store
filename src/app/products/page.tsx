'use client'

import { ProductList } from '@/components/products/product-list';
import { ProductFilters } from '@/components/products/product-filters';
import useProduct from '@/resources/product/product-hook';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/product.types';

// Componente que usa useSearchParams() envolvido em Suspense
function ProductsContent() {
  const { getProducts, getCategories, loading } = useProduct();
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  
  // Obter parâmetros de filtro da URL
  const order = searchParams.get('order') || 'asc';
  const orderBy = searchParams.get('orderBy');
  const category = searchParams.get('category') || '';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  
  // Carregar categorias
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    
    loadCategories();
  }, [getCategories]);
  
  // Carregar produtos quando os filtros mudarem
  useEffect(() => {
    const loadProducts = async () => {
      console.log('ProductsPage - Carregando produtos com filtros:', { order, orderBy, category, limit, page });
      
      const result = await getProducts({
        order: order as 'asc' | 'desc',
        orderBy: 'price',
        category,
        limit,
        page
      });
      
      console.log('ProductsPage - Produtos carregados:', result);
      setProducts(result);
    };
    
    loadProducts();
  }, [getProducts, order, orderBy, category, limit, page]);
  
  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      {/* Coluna de filtros (à esquerda no desktop) */}
      <div className="mb-6 lg:mb-0 lg:col-span-1">
        <ProductFilters categories={categories} />
      </div>
      
      {/* Coluna de produtos (à direita no desktop) */}
      <div className="lg:col-span-3">
        <ProductList 
          products={products} 
          loading={loading.getProducts} 
        />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { getCategories } = useProduct();
  const [categories, setCategories] = useState<string[]>([]);
  
  // Carregar categorias
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    
    loadCategories();
  }, [getCategories]);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Produtos</h1>
      
      <Suspense fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
            <p>Carregando...</p>
          </div>
        </div>
      }>
        <ProductsContent />
      </Suspense>
    </main>
  );
} 