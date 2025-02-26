import { render, screen, waitFor, act } from '@testing-library/react';
import Home from '../page';
import useProduct from '@/resources/product/product-hook';

// Mock do hook useProduct
jest.mock('@/resources/product/product-hook', () => ({
  __esModule: true,
  default: jest.fn()
}));

// Mock do componente ProductList
jest.mock('@/components/products/product-list', () => ({
  ProductList: ({ products, loading }: any) => (
    <div data-testid="product-list">
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="products-count">{products.length}</div>
    </div>
  )
}));

describe('Home Page', () => {
  const mockGetProducts = jest.fn();
  const mockGetCategories = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configurar o mock do hook
    (useProduct as jest.Mock).mockReturnValue({
      getProducts: mockGetProducts,
      getCategories: mockGetCategories,
      loading: { getProducts: false }
    });
    
    // Configurar o mock de getProducts para retornar produtos
    mockGetProducts.mockResolvedValue([
      { id: 1, title: 'Produto 1', price: 100, rating: { rate: 4.6, count: 120 } },
      { id: 2, title: 'Produto 2', price: 200, rating: { rate: 4.2, count: 80 } },
      { id: 3, title: 'Produto 3', price: 300, rating: { rate: 4.8, count: 150 } }
    ]);
  });

  it('deve renderizar o título da página', async () => {
    await act(async () => {
      render(<Home />);
    });
    
    expect(screen.getByText('Loja Virtual')).toBeInTheDocument();
    expect(screen.getByText('Produtos em Destaque')).toBeInTheDocument();
  });

  it('deve chamar getProducts e getCategories na montagem', async () => {
    await act(async () => {
      render(<Home />);
    });
    
    expect(mockGetProducts).toHaveBeenCalledWith({
      order: 'asc',
      orderBy: 'price'
    });
    
    expect(mockGetCategories).toHaveBeenCalled();
  });

  it('deve filtrar produtos em destaque (rating > 4.5)', async () => {
    await act(async () => {
      render(<Home />);
    });
    
    // Aguardar a atualização do estado após a chamada assíncrona
    await waitFor(() => {
      // Verificar que apenas 2 produtos (com rating > 4.5) são exibidos
      expect(screen.getByTestId('products-count').textContent).toBe('2');
    });
  });

  it('deve exibir o estado de carregamento', async () => {
    // Configurar o mock para mostrar carregamento
    (useProduct as jest.Mock).mockReturnValue({
      getProducts: mockGetProducts,
      getCategories: mockGetCategories,
      loading: { getProducts: true }
    });
    
    await act(async () => {
      render(<Home />);
    });
    
    // Verificar que o estado de carregamento é passado para o componente ProductList
    expect(screen.getByTestId('loading').textContent).toBe('true');
  });
}); 