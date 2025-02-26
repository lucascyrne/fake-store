"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductFilters } from "@/components/products/product-filters"
import { usePathname } from "next/navigation"

interface HeaderProps {
  categories: string[]
}

export function Header({ categories = [] }: HeaderProps) {
  const pathname = usePathname()
  const isProductsPage = pathname === "/products"
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            Loja Virtual
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
            >
              Início
            </Link>
            <Link 
              href="/products" 
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/products" ? "text-primary" : "text-muted-foreground"}`}
            >
              Produtos
            </Link>
          </nav>
        </div>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <button className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-2 py-6">
              <h2 className="mb-5 text-lg font-semibold">Navegação</h2>
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Início
                </Link>
                <Link 
                  href="/products" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/products" ? "text-primary" : "text-muted-foreground"}`}
                >
                  Produtos
                </Link>
              </nav>
            </div>
            
            {isProductsPage && categories.length > 0 && (
              <div className="border-t pt-6 mt-2">
                <h3 className="font-medium mb-4 px-2">Filtros</h3>
                <ProductFilters categories={categories} />
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
} 