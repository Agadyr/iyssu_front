"use client";

import { useAuthStore } from "@/store/auth/authStore";
import { Phone, MapPin } from "lucide-react";
import Link from "next/link";

const TopBar = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-gray-100 py-2 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" />
              {user?.city ? (
                <span className="text-sm">{user.city}</span>
              ) : (
                <Link href="/profile" className="text-sm hover:text-emerald-500 transition-colors">
                  Указать город
                </Link>
              )}
            </div>
          </div>
          
          <div className="space-x-8 hidden md:flex">
            <Link href="/catalog" className="text-sm text-gray-700 hover:text-emerald-500 transition-colors">
              Каталог
            </Link>
            <Link href="/brands" className="text-sm text-gray-700 hover:text-emerald-500 transition-colors">
              Бренды
            </Link>
            <Link href="/contacts" className="text-sm text-gray-700 hover:text-emerald-500 transition-colors">
              Контакты
            </Link>
            <Link href="/about" className="text-sm text-gray-700 hover:text-emerald-500 transition-colors">
              О компании
            </Link>
            <Link href="/promotions" className="text-sm text-gray-700 hover:text-emerald-500 transition-colors">
              Акции
            </Link>
          </div>
          
          <div className="flex items-center">
            <a href="tel:+77077295777" className="flex items-center text-gray-700 hover:text-emerald-500 transition-colors">
              <Phone className="w-4 h-4 mr-1 text-gray-500" />
              <span className="text-sm">+7 (747) 031 96-45</span>
            </a>
            <Link href="/callback" className="hidden md:block ml-4 text-sm text-gray-700 hover:text-emerald-500 transition-colors">
              Обратный звонок
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 