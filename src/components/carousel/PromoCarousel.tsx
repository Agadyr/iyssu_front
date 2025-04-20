import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CarouselNavigation } from '@/components/ui/carousel-navigation';

// Интерфейс для баннера
interface PromoBanner {
  id: number;
  imageUrl: string;
  altText: string;
  linkUrl?: string;
}

// Заглушка для баннеров (в будущем можно заменить на реальные данные)
const mockBanners: PromoBanner[] = [
  {
    id: 1,
    imageUrl: '/images/banners/bg.jpg',
    altText: 'Промокод на 2000 тенге',
    linkUrl: '/promo/2000',
  },
  {
    id: 2,
    imageUrl: '/images/banners/bg.jpg',
    altText: 'Скидки на парфюмерию',
    linkUrl: '/catalog/perfume',
  },
  {
    id: 3,
    imageUrl: '/images/banners/bg.jpg',
    altText: 'Новая коллекция',
    linkUrl: '/new-collection',
  },
];

interface PromoCarouselProps {
  className?: string;
  banners?: PromoBanner[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export const PromoCarousel = ({
  className,
  banners = mockBanners,
  autoplay = true,
  autoplayDelay = 5000,
}: PromoCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Функция для автоплея
  useEffect(() => {
    if (!autoplay || !emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);
    
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className={cn("relative rounded-lg overflow-hidden h-full flex flex-col bg-white shadow-sm", className)}>
      <div className="overflow-hidden flex-grow" ref={emblaRef}>
        <div className="flex h-full">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative flex-grow-0 flex-shrink-0 w-full min-w-0 h-full"
            >
              <a href={banner.linkUrl || '#'} className="block h-full">
                <Image
                  src={banner.imageUrl}
                  alt={banner.altText}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">{banner.altText}</h3>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Навигационные кнопки */}
      <CarouselNavigation 
        onPrevClick={scrollPrev} 
        onNextClick={scrollNext} 
        buttonSize="lg"
      />

      {/* Индикаторы */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === selectedIndex
                ? "bg-white w-8"
                : "bg-white/60 hover:bg-white/80"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Перейти к баннеру ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 