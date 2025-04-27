import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Product } from "@/types/products/types";
import { cn } from "@/lib/utils";
import VolumeButtons from "../VolumeButtons";
import { useState } from "react";
import { FavoriteButton } from "@/components/ui/favorite-button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const {
    id,
    name,
    price,
    brand,
    image_url,
    rating,
    discount,
    is_new,
    category,
    reviews_count,
    volume_options,
  } = product;
  const [selectedVolume, setSelectedVolume] = useState(volume_options[0]);
  const originalPrice = parseFloat(price);
  const discountPrice = discount
  ? originalPrice - (originalPrice * discount) / 100
    : null;

  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-shadow group", className)}>
      <div className="relative">
        <div className="relative h-[240px] bg-white overflow-hidden flex items-center justify-center">
          <Image
            loading="lazy"
            src={process.env.NEXT_PUBLIC_END_POINT + image_url[0]}
            alt={name}
            width={240}
            height={240}
            className="object-contain cursor-pointer max-h-[220px] max-w-[90%] transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/placeholder.jpg";
            }}
          />
        </div>

        {(discount || is_new) && <div className="absolute top-2 left-2 flex flex-col gap-1">
          {is_new && (
            <span className="bg-emerald-500 text-white  text-sm px-2 py-1 rounded">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount || ''}%
            </span>
          )}
        </div>}

        {/* Кнопка избранного */}
        <div className="absolute top-2 right-2">
          <FavoriteButton productId={id} product={product} size="lg" />
        </div>
      </div>

      <div className="p-4">
        {category && (
          <div className="text-xs text-gray-500 mb-1">{category.name}</div>
        )}

        <div className="text-sm font-medium text-gray-900 mb-1">{brand}</div>

        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-5">
          <Link href={`/product/${id}`} className="hover:text-emerald-600 transition-colors">
            {name}
          </Link>
        </h3>
        
        <div className="mb-3">
          <Rating rating={rating} reviewCount={parseInt(reviews_count)} />
        </div>

        <div className="flex gap-2">
          {volume_options?.map((volume, index) => (
            <VolumeButtons 
              key={index} 
              volume={volume} 
              isActive={selectedVolume === volume}
              onClick={() => setSelectedVolume(volume)}
            />
          ))}
        </div>

        {/* Цена */}
        <div className="flex justify-between items-center mt-4">
          <div>
            {discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-gray-900">
                  {(discountPrice * selectedVolume).toLocaleString()} ₸
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {(originalPrice * selectedVolume).toLocaleString()} ₸
                </span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-gray-900">
                {(originalPrice * selectedVolume).toLocaleString()} ₸
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            className="bg-emerald-500 py-1 hover:bg-emerald-600 text-white transition-colors"
          >
            <ShoppingCart className="size-6"/>
          </Button>

        </div>
      </div>
    </div>
  );
}; 