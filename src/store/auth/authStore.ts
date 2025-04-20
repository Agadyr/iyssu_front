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
}

export const checkAuthCookie = () => {
  if (typeof window === 'undefined') return false;
  return document.cookie.includes('auth_token=');
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  email: '',
  isAuthenticated: false,
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
