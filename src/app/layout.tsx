"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from 'sonner';

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
          <Toaster position="bottom-right" richColors />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
