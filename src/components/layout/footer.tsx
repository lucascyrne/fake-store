export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-base font-medium">Loja Virtual</h3>
            <p className="text-sm text-muted-foreground">
              Oferecendo produtos de qualidade com a melhor experiência de compra online.
            </p>
          </div>
          
          <div className="space-y-3 md:mx-auto">
            <h3 className="text-base font-medium">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Produtos
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3 md:ml-auto">
            <h3 className="text-base font-medium">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              Aplicação desenvolvida como parte de um desafio técnico.
              Todos os produtos são fictícios.
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Loja Virtual - Desenvolvido com Next.js, TypeScript e Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
} 