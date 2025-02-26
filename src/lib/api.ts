import { Product, ProductsFilters } from '@/types/product.types';

const API_URL = 'https://fakestoreapi.com';

export async function getProducts(filters: ProductsFilters = {}, timestamp?: number): Promise<Product[]> {
  const { limit = 10, category } = filters;
  
  // Simplificar a URL de busca - apenas buscar produtos sem tentar ordenar
  let url = `${API_URL}/products`;
  
  if (category) {
    url = `${API_URL}/products/category/${category}`;
  }
  
  if (limit) {
    url += url.includes('?') ? `&limit=${limit}` : `?limit=${limit}`;
  }
  
  // Adicionar timestamp para evitar cache
  if (timestamp) {
    url += url.includes('?') ? `&_=${timestamp}` : `?_=${timestamp}`;
  }
  
  const response = await fetch(url, { 
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  
  // Apenas retornar os produtos, sem ordenar
  return response.json();
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Produto não encontrado');
  }
  
  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/products/categories`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }
  
  return response.json();
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Erro ao atualizar produto');
  }
  
  return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Erro ao excluir produto');
  }
} 