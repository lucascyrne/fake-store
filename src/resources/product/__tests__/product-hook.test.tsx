import { renderHook } from '@testing-library/react';
import useProduct from '../product-hook';
import productContext from '../product-context';
import { ReactNode } from 'react';

// Mock do contexto
const mockProductContext = {
  loading: { getProducts: false },
  allProducts: null,
  featuredProducts: null,
  getProducts: jest.fn(),
  getCategories: jest.fn(),
  searchProducts: jest.fn(),
  getProductById: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  productDetails: undefined,
  setProductDetails: jest.fn(),
  resetProductDetails: jest.fn()
};

// Wrapper para o contexto
const wrapper = ({ children }: { children: ReactNode }) => (
  <productContext.Provider value={mockProductContext}>
    {children}
  </productContext.Provider>
);

describe('useProduct Hook', () => {
  it('deve retornar o contexto de produto', () => {
    const { result } = renderHook(() => useProduct(), { wrapper });
    
    expect(result.current).toEqual(mockProductContext);
    expect(result.current.getProducts).toBe(mockProductContext.getProducts);
    expect(result.current.getCategories).toBe(mockProductContext.getCategories);
  });
}); 