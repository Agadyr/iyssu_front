import { create } from "zustand";
import { Product } from "@/types/products/types";

export interface FavoriteItem {
  id: number;
  product_id: number;
  user_id: number;
  product: Product;
}

interface FavoriteState {
  favorites: FavoriteItem[];
  isLoading: boolean;
  error: Error | null;
  setFavorites: (favorites: FavoriteItem[]) => void;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (productId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  isProductFavorite: (productId: number) => boolean;
  reset: () => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,

  setFavorites: (favorites: FavoriteItem[]) => {
    set({ favorites });
  },

  addFavorite: (item: FavoriteItem) => {
    set((state) => ({
      favorites: [...state.favorites, item]
    }));
  },

  removeFavorite: (productId: number) => {
    set((state) => ({
      favorites: state.favorites.filter(item => item.product.id !== productId)
    }));
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: Error | null) => {
    set({ error });
  },

  isProductFavorite: (productId: number) => {
    return get().favorites.some((item) => item.product.id === productId);
  },

  reset: () => {
    set({
      favorites: [],
      isLoading: false,
      error: null
    });
  }
})); 