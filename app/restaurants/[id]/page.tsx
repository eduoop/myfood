import { db } from "@/app/_lib/prisma";
import { Restaurant } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryDetail from "@/app/_components/delivery-detail";
import ProductsList from "@/app/_components/products-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

async function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: params.id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: params.id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative mt-[-1.5rem] flex items-center justify-between rounded-t-3xl bg-white px-5 py-6 pt-5">
        {/* TITULO */}
        <div className="flex items-center gap-[0.375rem] ">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryDetail restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
          >
            <span className="text-sx text-muted-foreground">
              {" "}
              {category.name}
            </span>
          </div>
        ))}
      </div>

      {/* TODO mostrar produtos mais pedidos */}
      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais pedidos</h2>
        <ProductsList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductsList products={category.products} />
        </div>
      ))}
    </div>
  );
}

export default RestaurantPage;