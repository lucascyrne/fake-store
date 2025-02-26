"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product.types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { updateProduct } from '@/lib/api';
import { toast } from 'react-toastify';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  title: z.string()
    .min(3, {
      message: "O título deve ter pelo menos 3 caracteres",
    })
    .max(30, {
      message: "O título não pode ter mais de 30 caracteres",
    }),
  price: z.coerce.number().positive({
    message: "O preço deve ser um número positivo",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  image: z.string().url({
    message: "A imagem deve ser uma URL válida",
  }),
  category: z.string().min(1, {
    message: "Selecione uma categoria",
  }),
});

interface ProductFormProps {
  product: Product;
  categories: string[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    },
  });
  
  // Monitorar mudanças no campo de título para alertar sobre o limite
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title' && value.title && value.title.length > 30) {
        toast.error("O título não pode ter mais de 30 caracteres");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      await updateProduct(product.id, values);
      toast.success("Produto atualizado com sucesso!");
      router.push(`/products/${product.id}`);
      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Erro ao atualizar produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nome do produto" 
                      {...field} 
                      maxLength={30}
                      onChange={(e) => {
                        if (e.target.value.length <= 30) {
                          field.onChange(e);
                        } else {
                          // Truncar o valor para 30 caracteres
                          e.target.value = e.target.value.slice(0, 30);
                          field.onChange(e);
                          toast.error("O título não pode ter mais de 30 caracteres");
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/30 caracteres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    A categoria não pode ser alterada
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o produto" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Insira a URL completa da imagem do produto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 