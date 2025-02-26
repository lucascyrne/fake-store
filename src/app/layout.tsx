import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ProductProvider from "@/resources/product/product-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loja Virtual",
  description: "Aplicação de loja virtual com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ProductProvider>
          <Header categories={[]} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </ProductProvider>
      </body>
    </html>
  );
}
