"use server";

import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  console.log({ userId, restaurantId });

  await db.userFavoriteRestaurant.create({
    data: {
      restaurantId: restaurantId,
      userId: userId,
    },
  });

  revalidatePath("/");
};

export const unfavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  await db.userFavoriteRestaurant.delete({
    where: {
      userId_restaurantId: {
        userId: userId,
        restaurantId: restaurantId,
      },
    },
  });
  revalidatePath("/");
};
