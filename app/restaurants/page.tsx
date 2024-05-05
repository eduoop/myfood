import React, { Suspense } from "react";
import Restaurants from "./_components/resturants";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

async function RestaurantsPage() {
  const session = await getServerSession(authOptions);

  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <Suspense>
      <Restaurants userFavoritesRestaurants={userFavoritesRestaurants} />
    </Suspense>
  );
}

export default RestaurantsPage;
