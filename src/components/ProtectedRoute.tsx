'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, checkAuthToken } from '@/store/auth/authStore';
import Loading from '@/components/ui/loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, user, fetchUser, isLoading, setIsLoading } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      // Проверяем наличие токена в localStorage
      const hasToken = checkAuthToken();
      
      if (hasToken && !user) {
        // Если есть токен, но нет пользователя, загружаем данные пользователя
        try {
          await fetchUser();
        } catch (error) {
          console.error('Ошибка при загрузке пользователя:', error);
        }
      }
      
      setAuthChecked(true);
      setIsLoading(false);
    };

    if (!authChecked) {
      checkAuth();
    }
  }, [fetchUser, user, setIsLoading, authChecked]);

  useEffect(() => {
    // Перенаправляем только после проверки авторизации и если пользователь не авторизован
    if (authChecked && !isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, isLoading, router, authChecked]);

  // Показываем индикатор загрузки во время проверки авторизации
  if (isLoading || !authChecked) {
    return <div className="flex items-center justify-center min-h-screen">
      <Loading text=''/>
    </div>;
  }

  // Если пользователь авторизован, показываем содержимое
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // По умолчанию возвращаем null (пока выполняется перенаправление)
  return null;
};

export default ProtectedRoute; 