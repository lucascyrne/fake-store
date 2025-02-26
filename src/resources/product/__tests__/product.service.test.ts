import axios from 'axios';
import { productService } from '../product.service';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockedAxios.CancelToken.source as jest.Mock).mockReturnValue({
      token: 'mocked-token',
      cancel: jest.fn()
    });
  });

  describe('getProducts', () => {
    it('deve chamar a API correta para buscar produtos', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Produto Teste' }] };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const { promise } = productService.getProducts();
      const result = await promise;

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products',
        expect.objectContaining({
          cancelToken: 'mocked-token',
          headers: expect.any(Object)
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('deve incluir parâmetros de filtro na requisição', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Produto Teste' }] };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const { promise } = productService.getProducts({ 
        limit: 10, 
        order: 'asc' 
      });
      await promise;

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products',
        expect.objectContaining({
          params: {
            limit: '10',
            sort: 'asc'
          }
        })
      );
    });

    it('deve usar URL específica para filtro por categoria', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Produto Teste' }] };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const { promise } = productService.getProducts({ 
        category: 'electronics' 
      });
      await promise;

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/category/electronics',
        expect.anything()
      );
    });
  });

  describe('getCategories', () => {
    it('deve chamar a API correta para buscar categorias', async () => {
      const mockResponse = { data: ['electronics', 'clothing'] };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const { promise } = productService.getCategories();
      const result = await promise;

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/categories',
        expect.anything()
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getProductById', () => {
    it('deve chamar a API correta para buscar um produto por ID', async () => {
      const mockResponse = { data: { id: 1, title: 'Produto Teste' } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const { promise } = productService.getProductById(1);
      const result = await promise;

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/1',
        expect.anything()
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateProduct', () => {
    it('deve chamar a API correta para atualizar um produto', async () => {
      const mockResponse = { data: { id: 1, title: 'Produto Atualizado' } };
      mockedAxios.put.mockResolvedValueOnce(mockResponse);

      const productData = { title: 'Produto Atualizado' };
      const { promise } = productService.updateProduct(1, productData);
      const result = await promise;

      expect(mockedAxios.put).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/1',
        productData,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteProduct', () => {
    it('deve chamar a API correta para excluir um produto', async () => {
      const mockResponse = { data: { id: 1, title: 'Produto Excluído' } };
      mockedAxios.delete.mockResolvedValueOnce(mockResponse);

      const { promise } = productService.deleteProduct(1);
      const result = await promise;

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products/1',
        expect.anything()
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('searchProducts', () => {
    it('deve filtrar produtos corretamente com base nos critérios de busca', async () => {
      const mockProducts = [
        { id: 1, title: 'Smartphone', price: 1000, description: 'Um smartphone moderno' },
        { id: 2, title: 'Laptop', price: 2000, description: 'Um laptop potente' },
        { id: 3, title: 'Headphone', price: 300, description: 'Fones de ouvido' }
      ];
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

      const { promise } = productService.searchProducts(
        { query: 'phone', minPrice: 500 },
        { page: 1, size: 10 }
      );
      
      const result = await promise;
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products?limit=10',
        expect.anything()
      );
      
      // Deve filtrar apenas o smartphone (contém "phone" e preço >= 500)
      expect(result.data.content).toHaveLength(1);
      expect(result.data.content[0].id).toBe(1);
    });
  });
}); 