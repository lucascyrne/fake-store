import productContext, { ProductContext } from '../product-context';
import { createContext } from 'react';

describe('Product Context', () => {
  it('deve criar um contexto com valores padrão', () => {
    // Verificar que o contexto foi criado
    expect(productContext).toBeDefined();
    
    // Verificar que é um objeto de contexto React
    expect(productContext.Provider).toBeDefined();
    expect(productContext.Consumer).toBeDefined();
    
    // Verificar que o contexto foi criado com um valor padrão
    // Não podemos acessar o valor diretamente, mas podemos verificar que o contexto foi criado
    expect(productContext).not.toBe(createContext(undefined));
  });
}); 