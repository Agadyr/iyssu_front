import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Clock } from 'lucide-react';
import { Product } from '@/types/products/types';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product/Product-card';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';

interface ProductOfTheDayCardProps {
  product: Product[];
  className?: string;
}

export const ProductOfTheDayCard = ({ product, className }: ProductOfTheDayCardProps) => {
  // Таймер для товара дня - рассчитываем время до конца дня
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Рассчитываем время до конца дня при первом рендере
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diffMs = endOfDay.getTime() - now.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      setTimeLeft({
        hours: diffHours,
        minutes: diffMinutes,
        seconds: diffSeconds
      });
    };
    
    calculateTimeLeft();
  }, []);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Функции навигации
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Обратный отсчет
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23; // Сбрасываем на 24 часа
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (!product || product.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Товар дня не найден</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-md relative", className)}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xl pl-4 font-bold text-gray-900">Товар дня</h3>
        <div className="flex items-center text-gray-700 bg-amber-100 px-3 mx-3 py-1 rounded-md">
          <Clock className="w-4 h-4 mr-2 text-amber-500" />
          <span className='font-bold'>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {product.map((item) => (
              <div key={item.id} className="relative flex-none w-full p-4">
                <ProductCard product={item} className="shadow-none hover:shadow-none mx-auto max-w-md" />
              </div>
            ))}
          </div>
        </div>
        
        {product.length > 1 && (
          <CarouselNavigation 
            onPrevClick={scrollPrev} 
            onNextClick={scrollNext} 
          />
        )}
      </div>
    </div>
  );
}; 