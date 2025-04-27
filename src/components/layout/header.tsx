"use client";

import { useAuthStore } from "@/store/auth/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, User, ShoppingCart, Menu, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";

const Header = () => {
  const { user, logout, fetchUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      try {
        if (!user) {
          await fetchUser();
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    initUser();
  }, [fetchUser, user]);

  const handleLogout = async () => {
    await logout();
  };

  // Вместо полноэкранного лоадера используем простую заглушку
  if (isLoading) {
    return (
      <>
        <TopBar />
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">
                    Iys{" "}
                    <span className="text-emerald-500 bg-emerald-50 px-2 rounded-md">
                      su
                    </span>
                  </span>
                </Link>
              </div>
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Логотип */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">
                  Iys{" "}
                  <span className="text-emerald-500 bg-emerald-50 px-2 rounded-md">
                    su
                  </span>
                </span>
              </Link>
            </div>

            {/* Поисковая строка */}
            <div className="hidden md:block mx-auto w-[55%]">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/profile" className="mr-0">
                <Button
                  variant="ghost"
                  size="lg"
                  className="hover:bg-emerald-50 transition-colors p-3"
                >
                  <User
                    className="text-gray-700 hover:text-emerald-500 transition-colors size-6"
                    strokeWidth={2}
                  />
                  <span className="ml-1 text-base font-light hidden md:block">
                    Личный кабинет
                  </span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="lg"
                className="hover:bg-emerald-50 transition-colors p-3 relative"
              >
                <ShoppingCart className="text-gray-700 hover:text-emerald-500 transition-colors size-6" />
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>

              <Link href="/favorites">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-emerald-50 transition-colors p-3 relative"
              >
                  <Heart className="size-6" />
                </Button>
              </Link>

              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="hover:bg-emerald-50 transition-colors p-3"
                    onClick={handleLogout}
                  >
                    <LogOut
                      className="text-gray-700 hover:text-emerald-500 transition-colors size-6"
                      strokeWidth={2}
                    />
                  </Button>
                </div>
              ) : (
                <Link href="/sign-in" className="hidden md:block">
                  <Button
                    variant="outline"
                    className="text-lg px-8 py-2 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                  >
                    Войти
                  </Button>
                </Link>
              )}

              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="lg"
                  className="hover:bg-emerald-50 transition-colors p-3"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu
                    className="text-gray-700 hover:text-emerald-500 transition-colors size-7"
                    strokeWidth={2}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default Header;
