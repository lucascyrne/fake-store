'use client'

import React from 'react';
import { Product } from '@/types/product.types';
import { ProductCard } from './product-card';

interface ProductListProps {
  products: (Product | Omit<Product, 'id'> & { id?: number })[];
  loading?: boolean;
}

export function ProductList({ products, loading = false }: ProductListProps) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        <div className="text-center">
          <div className="mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        <div className="text-center">
          <p className="text-lg font-medium">Nenhum produto encontrado</p>
          <p className="text-sm text-muted-foreground">Tente ajustar os filtros para encontrar o que procura.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard 
          key={product.id || Math.random()}
          product={product as Product}
        />
      ))}
    </div>
  );
} 