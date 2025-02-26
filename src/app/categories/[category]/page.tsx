import { getProducts, getCategories } from '@/lib/api';
import { ProductList } from '@/components/products/product-list';
import { ProductFilters } from '@/components/products/product-filters';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  try {
    const decodedCategory = decodeURIComponent(params.category);
    
    const [products, categories] = await Promise.all([
      getProducts({ category: decodedCategory }),
      getCategories()
    ]);
    
    if (!categories.includes(decodedCategory)) {
      notFound();
    }
    
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Categoria: {decodedCategory}</h1>
        
        <ProductFilters categories={categories} />
        
        <ProductList products={products} />
      </main>
    );
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    notFound();
  }
} 