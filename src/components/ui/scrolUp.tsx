import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 200;
      setIsVisible(shouldShow);
      
      if (shouldShow) {
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Button 
      variant="outline" 
      className={cn(
        "fixed bottom-8 right-8 z-50 w-14 h-14 p-0 shadow-lg transition-all duration-300",
        "bg-white hover:bg-emerald-50 border-2 border-emerald-500 text-emerald-500 hover:text-emerald-600 hover:border-emerald-600",
        "rounded-full flex items-center justify-center ",
        isVisible ? "opacity-100 scale-100 animate-pulse" : "opacity-0 scale-75 pointer-events-none"
      )}
      onClick={scrollToTop}
      aria-label="Прокрутить вверх"
    >
      <ArrowUp className="size-6" />
    </Button>
  )
}

export default ScrollUp