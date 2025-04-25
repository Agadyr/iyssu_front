'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { useEffect, useState, MouseEvent } from 'react';
import { Product } from '@/types/products/types';
import { useFavorite } from '@/hooks/useFavorite';
import { useFavoriteStore } from '@/store/favorite/favoriteStore';

interface FavoriteButtonProps {
  productId: number;
  product?: Product;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FavoriteButton({ 
  productId, 
  product,
  size = 'md', 
  className 
}: FavoriteButtonProps) {
  const { isProductFavorite, addToFavorites, removeFromFavorites } = useFavorite();
  const { favorites } = useFavoriteStore();

  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    setIsFavorite(isProductFavorite(productId));
  }, [productId, favorites, isProductFavorite]);
  
  const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId, product);
    }
  };

  const heartSizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  };
  
  return (
    <Button
      onClick={handleToggleFavorite}
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm transition-colors",
        size === 'sm' ? 'size-7' : size === 'md' ? 'size-9' : 'size-11',
        className
      )}
    >
      <Heart
        className={cn(
          heartSizes[size],
          isFavorite 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-500 hover:text-red-500 transition-colors'
        )}
      />
    </Button>
  );
} 