import { getProduct, getCategories } from '@/lib/api';
import { ProductForm } from '@/components/products/product-form';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const [product, categories] = await Promise.all([
      getProduct(parseInt(params.id)),
      getCategories()
    ]);
    
    return (
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Produtos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${product.id}`}>{product.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Editar</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <h1 className="mb-8 text-3xl font-bold">Editar Produto</h1>
        <ProductForm product={product} categories={categories} />
      </main>
    );
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    notFound();
  }
} 