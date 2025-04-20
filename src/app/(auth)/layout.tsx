'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_END_POINT}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
  }, []);
  
  return (
    <main className="flex min-h-screen bg-white">
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </section>

      <section className="hidden md:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/images/bg.jpg"
          alt="Роскошный парфюм"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 0vw, 50vw"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
          <h2 className="text-4xl font-semibold mb-3 text-white">
            Добро пожаловать в <span className="text-emerald-400">iys su</span>
          </h2>
          <p className="text-lg text-gray-200 max-w-md">
            Откройте для себя коллекцию изысканных парфюмов
          </p>
        </div>
      </section>
    </main>
  );
}
