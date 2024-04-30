import React from "react";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

async function RestaurantList() {
  // TODO: trazer restaurantes com maior número de pedidos
  const restaurants = await db.restaurant.findMany({
    take: 10,
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default RestaurantList;
