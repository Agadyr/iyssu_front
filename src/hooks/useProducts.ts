import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Product } from '@/types/products/types';

export const useProducts = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('api/products/popular');
      return response.data as Product[];
    },
    staleTime: 5 * 60 * 1000
  });

  return {
    products,
    isLoading,
    error,
    refetch
  };
};

export const useProductOfTheDay = () => {
  const {
    data: product,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['product-of-the-day'],
    queryFn: async () => {
      const response = await api.get('api/products/today');
      return response.data as Product[];
    },
    staleTime: 30 * 60 * 1000
  });

  return {
    product,
    isLoading,
    error,
    refetch
  };
}; 