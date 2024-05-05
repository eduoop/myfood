"use client";

import React, { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import searchForRestaurant from "../_actions/search";
import { Restaurant } from "@prisma/client";
import Header from "../../_components/header";
import RestaurantItem from "../../_components/restaurant-item";

function Restaurants() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) return;
    const fetchRestaurants = async () => {
      const foundRestaurants = await searchForRestaurant(search);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [search]);

  if (!search) {
    return notFound();
  }

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Restaurants;
