import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: string;
  maxRating?: number;
  className?: string;
  reviewCount?: number;
  showCount?: boolean;
}

export const Rating = ({ 
  rating, 
  maxRating = 5,
  className,
  reviewCount = 0,
  showCount = true
}: RatingProps) => {
  const ratingValue = parseFloat(rating);
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex">
        {/* Полные звезды */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}

        {/* Полузвезда */}
        {hasHalfStar && (
          <div className="relative w-4 h-4">
            <Star
              className="absolute w-4 h-4 text-yellow-400"
            />
            <div className="absolute w-2 h-4 overflow-hidden">
              <Star
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            </div>
          </div>
        )}

        {/* Пустые звезды */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-4 h-4 text-yellow-400"
          />
        ))}
      </div>
      
      {showCount && reviewCount > 0 && (
        <span className="ml-2 text-xs text-gray-500">{reviewCount} отзыва</span>
      )}
    </div>
  );
}; 