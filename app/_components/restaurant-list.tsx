import React from "react";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { convertObjectWithDecimal } from "../_helpers/convert-object-with-decimal";

async function RestaurantList() {
  // TODO: trazer restaurantes com maior número de pedidos
  const restaurants = await db.restaurant.findMany({
    take: 4,
  });

  const session = await getServerSession(authOptions);

  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <>
      <div className="flex gap-4 overflow-x-scroll px-5 laptop:hidden [&&::-webkit-scrollbar]:hidden">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={convertObjectWithDecimal(restaurant)}
            userFavoritesRestaurants={userFavoritesRestaurants}
          />
        ))}
      </div>
      <div className="hidden gap-3 laptop:grid laptop:grid-cols-3 desktop:grid-cols-4">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={convertObjectWithDecimal(restaurant)}
            userFavoritesRestaurants={userFavoritesRestaurants}
          />
        ))}
      </div>
    </>
  );
}

export default RestaurantList;
