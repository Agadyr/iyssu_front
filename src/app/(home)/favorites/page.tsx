'use client';

import { ProductCard } from '@/components/product/Product-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/ui/empty-state';
import Header from '@/components/layout/header';
import { useEffect } from 'react';
import { FavoriteButton } from '@/components/ui/favorite-button';
import { useFavorite } from '@/hooks/useFavorite';
import { useFavoriteStore } from '@/store/favorite/favoriteStore';
import Loading from '@/components/ui/loading';
export default function FavoritesPage() {
  const { isLoading, error, fetchFavorites } = useFavorite();
  const { favorites } = useFavoriteStore(); 
  
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Избранные товары</h1>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              На главную
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loading text="Загрузка ..." />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-500 text-center">
            Не удалось загрузить избранные товары. Пожалуйста, попробуйте позже.
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((item) => (
              <div key={item.product.id} className="relative">
                <div className="absolute top-2 right-2 z-10">
                  <FavoriteButton 
                    productId={item.product.id} 
                    size="lg"
                  />
                </div>
                <ProductCard key={item.product.id} product={item.product} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Heart className="w-16 h-16 text-gray-300" />}
            title="Нет избранных товаров"
            description="Добавляйте товары в избранное, чтобы они появились здесь"
            action={
              <Link href="/catalog">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Перейти в каталог
                </Button>
              </Link>
            }
          />
        )}
      </div>
    </>
  );
} 