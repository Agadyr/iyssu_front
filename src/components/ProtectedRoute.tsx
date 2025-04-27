'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, checkAuthToken } from '@/store/auth/authStore';
import { LoaderCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, fetchUser, isLoading, setIsLoading } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  // Используем client-side рендеринг
  const [isMounted, setIsMounted] = useState(false);

  // Ждем монтирования на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const checkAuth = async () => {
      if (!mounted) return;
      
      setIsLoading(true);
      
      // Проверяем наличие токена в localStorage
      const hasToken = checkAuthToken();
      
      if (hasToken) {
        // Если есть токен, загружаем данные пользователя
        try {
          await fetchUser();
          // После fetchUser state isAuthenticated уже должен быть true
        } catch (error) {
          console.error('Ошибка при загрузке пользователя:', error);
        }
      }
      
      if (mounted) {
        setAuthChecked(true);
        setIsLoading(false);
      }
    };

    if (isMounted && !authChecked && !isAuthenticated) {
      checkAuth();
    }
    
    return () => {
      mounted = false;
    };
  }, [fetchUser, authChecked, isAuthenticated, setIsLoading, isMounted]);

  useEffect(() => {
    // Перенаправляем только после проверки авторизации и если пользователь не авторизован
    if (isMounted && authChecked && !isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, isLoading, router, authChecked, isMounted]);

  // Не отображаем ничего до монтирования на клиенте, чтобы избежать ошибок гидратации
  if (!isMounted) {
    return null;
  }

  // Показываем индикатор загрузки во время проверки авторизации
  if (isLoading || (!authChecked && !isAuthenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <LoaderCircle className="h-12 w-12 text-emerald-500 animate-spin" />
        </div>
      </div>
    );
  }

  // Если пользователь авторизован или еще в процессе проверки, показываем содержимое
  return <>{children}</>;
};

export default ProtectedRoute; 