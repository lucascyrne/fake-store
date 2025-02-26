"use client"

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product.types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { deleteProduct } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Star, Edit } from "lucide-react";
import { formatCurrency } from '@/utils/format-utils';
import { Separator } from '@/components/ui/separator';
import { DeleteConfirmationDialog } from '@/components/modals/delete-confirmation-dialog';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  
  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      setConfirmationOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };
  
  const isFeatured = product.rating.rate > 4.5;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-3 transition-all hover:shadow-md">
      {isFeatured && (
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 z-10 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
        >
          <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
          Destaque
        </Badge>
      )}
      
      <Sheet>
        <SheetTrigger asChild>
          <div className="cursor-pointer">
            <div className="relative aspect-square mb-3 overflow-hidden rounded-md bg-muted">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="space-y-1 text-sm">
              <h3 className="font-medium leading-tight line-clamp-2">{product.title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
              <p className="font-bold text-base">{formatCurrency(product.price)}</p>
            </div>
          </div>
        </SheetTrigger>
        
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-xl">{product.title}</SheetTitle>
            <div className="flex items-center mt-2">
              <Badge className="mr-2 capitalize">{product.category}</Badge>
              <span className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-amber-500 mr-1" />
                <span>{product.rating.rate}</span>
                <span className="text-muted-foreground text-xs ml-1">({product.rating.count} avaliações)</span>
              </span>
            </div>
          </SheetHeader>
          
          <Separator className="my-4" />
          
          <div className="space-y-6">
            <div className="relative h-72 w-full overflow-hidden rounded-md bg-muted">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Descrição</h4>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Preço</h4>
              <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
            </div>
          </div>
          
          <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
            <SheetClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Fechar
              </Button>
            </SheetClose>
            <Button 
              className="w-full sm:w-auto"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              Ver página completa
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      <div className="mt-3 flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 flex items-center justify-center"
          onClick={() => router.push(`/products/${product.id}/edit`)}
        >
          <Edit className="h-3.5 w-3.5 mr-1" />
          Editar
        </Button>
        
        <DeleteConfirmationDialog
          isOpen={confirmationOpen}
          onOpenChange={setConfirmationOpen}
          onConfirm={handleDelete}
          itemName={product.title}
          triggerClassName="flex-1 flex items-center justify-center"
        />
      </div>
    </div>
  );
} 