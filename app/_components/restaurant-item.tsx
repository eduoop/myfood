"use client";
import React from "react";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import Image from "next/image";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../_actions/restaurant";
import { useToast } from "@/app/_components/ui/use-toast";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userId?: string;
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

function RestaurantItem({
  restaurant,
  className,
  userId,
  userFavoritesRestaurants,
}: RestaurantItemProps) {
  const { toast } = useToast();
  const isFavorite = userFavoritesRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!userId) {
      return;
    }

    if (isFavorite) {
      unfavoriteRestaurant(userId, restaurant.id);
      return toast({ title: "Restaurante removido dos favoritos" });
    }

    try {
      await favoriteRestaurant(userId, restaurant.id);
      toast({ title: "Restaurante favoritado com sucesso!" });
    } catch (error) {
      toast({ title: "Erro ao favoritar o restaurante" });
    }
  };

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="rounded-lg object-cover"
              fill
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary-foreground px-2 py-[2px] text-black">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          {userId && (
            <Button
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 hover:bg-red-900 ${isFavorite && "bg-primary transition duration-300 hover:bg-gray-700"}`}
              size={"icon"}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={17} className="fill-white" />
            </Button>
          )}
        </div>
        <Link href={`/restaurants/${restaurant.id}`}>
          <div>
            <h3 className="text-sm font-semibold">{restaurant.name}</h3>

            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <BikeIcon className="text-primary" size={14} />
                <span className="text-xs text-muted-foreground">
                  {Number(restaurant.deliveryFee) === 0
                    ? "Entrega grátis"
                    : formatCurrency(Number(restaurant.deliveryFee))}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <TimerIcon className="text-primary" size={14} />
                <span className="text-xs text-muted-foreground">
                  {restaurant.deliveryTimeMinutes} min
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default RestaurantItem;
