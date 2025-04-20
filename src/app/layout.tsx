"use client";

import "./globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 минута
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ru">
        <body>  
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </body>
      </html>
    </QueryClientProvider>
  );
}
