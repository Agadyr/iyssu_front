'use client';

import { useProducts } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/product/ProductGrid";
import Header from "@/components/layout/header";
import { Loader2 } from "lucide-react";

export default function Catalog() {
  const { products, isLoading, error } = useProducts();

  return (
    <>
      <Header />
      <main className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Каталог товаров</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            <span className="ml-3 text-lg">Загрузка товаров...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            Произошла ошибка при загрузке товаров. Пожалуйста, попробуйте позже.
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-medium text-gray-500">Товары не найдены</h2>
            <p className="mt-4 text-gray-400">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-500">Найдено товаров: {products.length}</p>
            </div>
            <ProductGrid products={products} />
          </>
        )}
      </main>
    </>
  );
} 