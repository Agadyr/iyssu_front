'use client';

import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/ui/empty-state';
import Header from '@/components/layout/header';
import { useEffect } from 'react';
import { useFavorite } from '@/hooks/useFavorite';
import { useFavoriteStore } from '@/store/favorite/favoriteStore';
import Loading from '@/components/ui/loading';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function FavoritesPage() {
  const { isLoading, error, fetchFavorites } = useFavorite();
  const { favorites } = useFavoriteStore(); 
  
  useEffect(() => {
    const loadFavorites = async () => {
      await fetchFavorites();
    };
    
    loadFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedRoute>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.product.id} className="relative">
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
    </ProtectedRoute>
  );
} 