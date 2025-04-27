import { create } from "zustand";
import { User } from "@/types/auth/user/user";
import api from "@/lib/axios";

interface AuthState {
  user: User | null;
  email: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setEmail: (email: string) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

// Проверка наличия токена в localStorage
export const checkAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token') !== null;
  }
  return false;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  email: '',
  isAuthenticated: checkAuthToken(), // Используем функцию проверки при инициализации
  isLoading: false,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },
  
  setEmail: (email) => {
    set({ email })
  },

  setIsLoading: (isLoading) => {
    set({ isLoading });
  },

  fetchUser: async () => {
    set({ isLoading: true });
    
    try {
      const response = await api.get<User>("api/profile/me");
      set({ 
        user: response.data, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    try {
      await api.post("api/auth/logout");
      localStorage.removeItem('auth_token');
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  },
}));
