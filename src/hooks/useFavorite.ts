import api from "@/lib/axios";
import { toast } from "sonner";
import { useFavoriteStore } from "@/store/favorite/favoriteStore";
import { Product } from "@/types/products/types";
import { useCallback } from "react";

export const useFavorite = () => {
  const { 
    favorites, 
    isLoading,
    error,
    setFavorites, 
    setLoading,
    setError,
    addFavorite,
    removeFavorite
  } = useFavoriteStore();

  // Используем useCallback, чтобы функция была стабильной между рендерами
  const fetchFavorites = useCallback(async () => {
    // Проверяем, не идет ли уже загрузка, чтобы избежать множественных запросов
    if (isLoading) return;
    
    setLoading(true);
    try {
      const response = await api.get("api/favorite");
      setFavorites(response.data);
    } catch (error) {
      console.error("Ошибка при получении избранного:", error);
      setError(error as Error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [isLoading, setError, setFavorites, setLoading]);

  const addToFavorites = async (productId: number, product?: Product) => {
    if (product) {
      const tempItem = {
        id: Date.now(), // временный id
        product_id: productId,
        user_id: 0, // временное значение
        product: product
      };
      
      addFavorite(tempItem);
    }
    
    try {
      await api.post("api/favorite/add", { product_id: productId });
      
      toast.success("Товар добавлен в избранное");
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
      
      if (product) {
        removeFavorite(productId);
      }
      
      toast.error("Не удалось добавить товар в избранное");
    }
  };

  const removeFromFavorites = async (productId: number) => {
    const removedItem = favorites.find(item => item.product.id === productId);
    
    removeFavorite(productId);
    
    try {
      await api.delete("api/favorite/remove", {
        data: { product_id: productId },
      });
      
      toast.success("Товар удален из избранного");
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
      
      if (removedItem) {
        addFavorite(removedItem);
      }
      
      toast.error("Не удалось удалить товар из избранного");
    }
  };

  const isProductFavorite = (productId: number) => {
    return favorites.some((item) => item.product.id === productId);
  };

  return {
    favorites,
    isLoading,
    error,
    isProductFavorite,
    addToFavorites,
    removeFromFavorites,
    fetchFavorites
  };
}; 