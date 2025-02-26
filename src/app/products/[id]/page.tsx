import { getProduct, getCategories } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, Edit } from 'lucide-react';
import { formatCurrency } from '@/utils/format-utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product = await getProduct(parseInt(params.id));
    
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex flex-col items-start justify-start gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <Link href={`/products/${product.id}/edit`}>
            <Button className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar Produto
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge className="capitalize">{product.category}</Badge>
              {product.rating.rate > 4.5 && (
                <Badge 
                  variant="secondary" 
                  className="bg-amber-100 text-amber-800 border-amber-200"
                >
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                  Produto em Destaque
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                <Star className="h-5 w-5 fill-amber-500 mr-1" />
                <span className="font-medium">{product.rating.rate}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.rating.count} avaliações)
              </span>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold">{formatCurrency(product.price)}</h2>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Descrição</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="pt-4">
              <Link href={`/products/${product.id}/edit`}>
                <Button size="lg" className="w-full md:w-auto">
                  Editar Produto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    notFound();
  }
} 