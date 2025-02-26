'use client'

import { ProductList } from '@/components/products/product-list';
import useProduct from '@/resources/product/product-hook';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product.types';

export default function Home() {
  const { getProducts, getCategories, loading } = useProduct();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Função para carregar produtos
    const loadProducts = async () => {
      // Buscar todos os produtos sem filtro de categoria
      const result = await getProducts({
        order: 'asc',
        orderBy: 'price',
      });
      
      // Filtrar apenas produtos em destaque (rating > 4.5)
      const featured = result.filter(p => p.rating.rate > 4.5);
      console.log('Produtos em destaque:', featured);
      setProducts(featured);
    };
    
    loadProducts();
    getCategories();
  }, [getProducts, getCategories]);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Loja Virtual</h1>
        <Link 
          href="/products" 
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ver todos os produtos
        </Link>
      </div>
      
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Produtos em Destaque</h2>
        <ProductList 
          products={products} 
          loading={loading.getProducts} 
        />
      </section>
    </main>
  );
}
