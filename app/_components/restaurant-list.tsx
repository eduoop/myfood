import React from "react";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

async function RestaurantList() {
  // TODO: trazer restaurantes com maior número de pedidos
  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  const session = await getServerSession(authOptions);

  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userId={session?.user?.id}
          userFavoritesRestaurants={userFavoritesRestaurants}
        />
      ))}
    </div>
  );
}

export default RestaurantList;
