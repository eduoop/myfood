import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import RestaurantList from "@/app/_components/restaurant-list";
import { convertObjectWithDecimal } from "@/app/_helpers/convert-object-with-decimal";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";

async function RecommendedRestaurants() {
  const restaurants = await db.restaurant.findMany({});

  const session = await getServerSession(authOptions);

  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6 laptop:px-44">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>

        <div className="flex w-full flex-col gap-6 tablet:hidden">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={convertObjectWithDecimal(restaurant)}
              className="min-w-full max-w-full"
              userFavoritesRestaurants={userFavoritesRestaurants}
            />
          ))}
        </div>

        <div className="hidden gap-4 tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={convertObjectWithDecimal(restaurant)}
              className="min-w-full max-w-full"
              userFavoritesRestaurants={userFavoritesRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default RecommendedRestaurants;
