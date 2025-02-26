import { render } from '@testing-library/react';
import ProductProvider from '../product-provider';
import productContext from '../product-context';
import { useContext } from 'react';

// Mock simplificado do serviço
jest.mock('../product.service', () => ({
  productService: {
    getProducts: jest.fn().mockReturnValue({
      promise: Promise.resolve({ data: [] }),
      abort: jest.fn()
    }),
    getCategories: jest.fn().mockReturnValue({
      promise: Promise.resolve({ data: [] }),
      abort: jest.fn()
    }),
    getProductById: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    searchProducts: jest.fn()
  }
}));

// Componente de teste para acessar o contexto
const TestComponent = ({ testFn }: { testFn: (context: any) => void }) => {
  const context = useContext(productContext);
  testFn(context);
  return null;
};

describe('ProductProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve fornecer o estado inicial correto', () => {
    let contextValue: any;
    
    render(
      <ProductProvider>
        <TestComponent testFn={(context) => { contextValue = context; }} />
      </ProductProvider>
    );

    // Verificar apenas o estado inicial
    expect(contextValue).toBeDefined();
    expect(contextValue.loading).toBeDefined();
    expect(contextValue.allProducts).toBeNull();
    expect(contextValue.featuredProducts).toBeNull();
    expect(contextValue.productDetails).toBeUndefined();
    
    // Verificar que as funções estão definidas
    expect(typeof contextValue.getProducts).toBe('function');
    expect(typeof contextValue.getCategories).toBe('function');
    expect(typeof contextValue.searchProducts).toBe('function');
  });
}); 