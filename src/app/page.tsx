'use client'

import { useProducts, useProductOfTheDay } from "@/hooks/useProducts";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PromoCarousel } from "@/components/carousel/PromoCarousel";
import { ProductOfTheDayCard } from "@/components/carousel/ProductOfTheDayCard";
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from "next/link";
import Header from "@/components/layout/header";
import ScrollUp from "@/components/ui/scrolUp";
import { useFavorite } from "@/hooks/useFavorite";
import { useEffect } from "react";
import Loading from "@/components/ui/loading";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function Home() {
  
  return (
    <ProtectedRoute>
      <div>
        <Header />  
        <ScrollUp />
        <main className="container mx-auto space-y-8 py-6 md:px-0 px-4">
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <PromoCarousel />
              </div>
              
              <div className="lg:col-span-4">
                <ProductOfTheDayContent />
              </div>
            </div>
          </section>
          
          <section>
            <div className="flex flex-col md:flex-row justify-between md:items-center items-start mb-8 sm:mb-4">
              <h2 className="text-2xl font-bold text-gray-900 sm:mb-0 mb-2">Популярные товары</h2>
              <div className="flex items-center gap-4">
                <Link href="/favorites">
                  <Button variant="outline" className="group">
                    Избранное
                    <Heart className="ml-2 w-4 h-4 transition-colors group-hover:scale-110 group-hover:text-red-500" />
                  </Button>
                </Link>
                <Link href="/catalog">
                  <Button variant="outline" className="group">
                    Все товары
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <PopularProductsContent />
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// Компонент для отображения товара дня с состояниями загрузки и ошибки
function ProductOfTheDayContent() {
  const { product: productOfTheDay, isLoading, error } = useProductOfTheDay();
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md flex items-center justify-center p-8 h-[500px]">
        <Loading text="Загрузка ..." />
      </div>
    );
  }
  
  if (error || !productOfTheDay) {
    return (
      <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Не удалось загрузить товар дня</p>
        </div>
      </div>
    );
  }
  
  return <ProductOfTheDayCard product={productOfTheDay} />;
}

function PopularProductsContent() {
  const { fetchFavorites } = useFavorite();
  useEffect(() => {fetchFavorites()}, []);
  
  const { products, isLoading, error } = useProducts();
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Loading text="Загрузка ..." />
      </div>
    );
  }
  
  if (error || !products) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 mb-4">Не удалось загрузить товары</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Попробовать снова
        </Button>
      </div>
    );
  }
  
  return <ProductGrid products={products.slice(0, 8)} />;
}
