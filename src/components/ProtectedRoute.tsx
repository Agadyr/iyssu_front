"use client";

import { checkAuthCookie, useAuthStore } from "@/store/auth/authStore";
import { useEffect } from "react";
import LoadingScreen from "@/app/loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, fetchUser } = useAuthStore();

  useEffect(() => { 
    if (checkAuthCookie()) {
      fetchUser();
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
