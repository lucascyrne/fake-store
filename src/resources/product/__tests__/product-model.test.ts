import { SortOrderConst, SortOrderType } from '../product-model';

describe('Product Model', () => {
  it('deve definir as constantes de ordenação corretamente', () => {
    expect(SortOrderConst).toEqual(['asc', 'desc']);
  });

  it('deve permitir apenas valores válidos para SortOrderType', () => {
    // Teste de tipagem (não é executado em tempo de execução)
    const validAsc: SortOrderType = 'asc';
    const validDesc: SortOrderType = 'desc';
    
    // Se o código compilar, o teste passa
    expect(validAsc).toBe('asc');
    expect(validDesc).toBe('desc');
  });
}); 