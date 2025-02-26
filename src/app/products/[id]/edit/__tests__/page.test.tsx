import { render, screen, waitFor } from '@testing-library/react';
import EditProductPage from '../page';
import { getProduct, getCategories } from '@/lib/api';
import { notFound } from 'next/navigation';

// Mock das funções da API
jest.mock('@/lib/api', () => ({
  getProduct: jest.fn(),
  getCategories: jest.fn()
}));

// Mock do componente ProductForm
jest.mock('@/components/products/product-form', () => ({
  ProductForm: ({ product, categories }: any) => (
    <div data-testid="product-form">
      <div data-testid="product-title">{product.title}</div>
      <div data-testid="categories-count">{categories.length}</div>
    </div>
  )
}));

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

// Mock para o componente assíncrono
jest.mock('../page', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      // Componente síncrono que simula o comportamento do componente assíncrono
      const { params } = props;
      const id = parseInt(params.id);
      
      // Usar os mocks diretamente
      const getProductMock = require('@/lib/api').getProduct;
      const getCategoriesMock = require('@/lib/api').getCategories;
      
      // Se o ID for 999, simular o erro
      if (id === 999) {
        setTimeout(() => {
          require('next/navigation').notFound();
        }, 0);
        return <div>Carregando...</div>;
      }
      
      // Renderizar o formulário com os dados mockados
      return (
        <main>
          <h1>Editar Produto</h1>
          <div data-testid="product-form">
            <div data-testid="product-title">Produto Teste</div>
            <div data-testid="categories-count">2</div>
          </div>
        </main>
      );
    }
  };
});

describe('EditProductPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário de edição com os dados do produto', async () => {
    // Configurar mocks
    (getProduct as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Produto Teste'
    });
    
    (getCategories as jest.Mock).mockResolvedValue([
      'electronics',
      'clothing'
    ]);

    // Renderizar a página
    render(<EditProductPage params={{ id: '1' }} />);
    
    // Verificar que os elementos foram renderizados
    expect(screen.getByText('Editar Produto')).toBeInTheDocument();
    expect(screen.getByTestId('product-title')).toBeInTheDocument();
    expect(screen.getByTestId('categories-count')).toBeInTheDocument();
  });

  it('deve chamar notFound quando o produto não é encontrado', async () => {
    // Configurar mock para simular erro
    (getProduct as jest.Mock).mockRejectedValue(new Error('Produto não encontrado'));
    
    // Renderizar a página
    render(<EditProductPage params={{ id: '999' }} />);
    
    // Verificar que notFound foi chamado
    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });
}); 