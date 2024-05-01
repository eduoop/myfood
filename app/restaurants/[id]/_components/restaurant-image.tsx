"use client";
import { Button } from "@/app/_components/ui/button";
import { Product, Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductImageProps {
  restaurant: Pick<Restaurant, "imageUrl" | "name">;
}

function RestaurantImage({ restaurant }: ProductImageProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[250px] w-full">
      <Image
        className="object-cover"
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:bg-primary-foreground/90"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon className="mr-[2px]" />
      </Button>

      <Button
        className="absolute right-4 top-4 rounded-full bg-gray-700 hover:bg-red-900"
        size={"icon"}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
}

export default RestaurantImage;
