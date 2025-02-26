"use client"

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import useProduct from '@/resources/product/product-hook';

interface ProductFiltersProps {
  categories: string[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const order = searchParams.get('order') || 'asc';
  const orderBy = searchParams.get('orderBy') || '';
  const category = searchParams.get('category') || 'all';
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';
  
  const { allProducts } = useProduct();
  const totalPages = allProducts?.totalPages || 1;
  
  // Função para criar uma nova URL com os parâmetros atualizados
  const createQueryString = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([name, value]) => {
      if (value) {
        newParams.set(name, value);
      } else {
        newParams.delete(name);
      }
    });
    
    return newParams.toString();
  };
  
  const handlePriceChange = (value: string) => {
    router.push(`${pathname}?${createQueryString({
      orderBy: 'price',
      order: value
    })}`);
  };
  
  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('category');
      router.push(`${pathname}?${newParams.toString()}`);
    } else {
      router.push(`${pathname}?${createQueryString({
        category: value
      })}`);
    }
  };
  
  const handleLimitChange = (value: string) => {
    router.push(`${pathname}?${createQueryString({
      limit: value
    })}`);
  };
  
  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return; // Evitar páginas negativas
    
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };
  
  return (
    <div className="space-y-4 rounded-lg border p-4 shadow-sm md:p-6">
      <h3 className="flex items-center gap-2 text-lg font-medium">
        <Filter className="h-5 w-5" />
        Filtros
      </h3>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ordenar por preço</label>
          <Select value={order} onValueChange={handlePriceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a ordem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Menor preço</SelectItem>
              <SelectItem value="desc">Maior preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Categoria</label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Itens por página</label>
          <Select value={limit} onValueChange={handleLimitChange}>
            <SelectTrigger>
              <SelectValue placeholder="Itens por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 itens</SelectItem>
              <SelectItem value="10">10 itens</SelectItem>
              <SelectItem value="20">20 itens</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-2 border-t pt-4 lg:justify-start">
        <Button
          variant="outline"
          size="sm"
          disabled={Number(page) <= 1}
          onClick={() => handlePageChange(Number(page) - 1)}
        >
          Anterior
        </Button>
        <span className="text-sm">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={Number(page) >= totalPages}
          onClick={() => handlePageChange(Number(page) + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
} 