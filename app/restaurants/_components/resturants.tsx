"use client";

import React, { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import searchForRestaurant from "../_actions/search";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import Header from "../../_components/header";
import RestaurantItem from "../../_components/restaurant-item";
import { convertObjectWithDecimal } from "@/app/_helpers/convert-object-with-decimal";
import ArrowBack from "@/app/_components/arrow-back";

interface RestaurantsProps {
  userFavoritesRestaurants?: UserFavoriteRestaurant[];
}

function Restaurants({ userFavoritesRestaurants }: RestaurantsProps) {
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
      <Header searchParams={search} />

      <div className="mb-6 px-5 pt-3 laptop:px-44">
        <ArrowBack />
      </div>

      <div className="px-5 laptop:px-44">
        <h2 className="mb-6 text-lg font-semibold">
          Resultados para &ldquo;{search}&ldquo;
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

export default Restaurants;
