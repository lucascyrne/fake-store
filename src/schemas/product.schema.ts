import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().max(30, 'O nome do produto não pode ter mais de 30 caracteres'),
  price: z.number().positive('O preço deve ser um valor positivo'),
  rating: z.number().positive('A avaliação deve ser um valor positivo'),
  description: z.string(),
  category: z.string(),
  image: z.string().url('A imagem deve ser uma URL válida'),
});

export const productUpdateSchema = productSchema.omit({ category: true });

export const productsFiltersSchema = z.object({
  limit: z.number().min(1).max(20).optional().default(10),
  page: z.number().min(1).optional().default(1),
  order: z.enum(['asc', 'desc']).optional().default('asc'),
  category: z.string().optional(),
}); 