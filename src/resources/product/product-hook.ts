import { useContext } from 'react';
import productContext, { ProductContext } from './product-context';

export default function useProduct(): ProductContext {
  return useContext(productContext);
} 