import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantCurrentlyFavorite = (
  userFavoritesRestaurants: UserFavoriteRestaurant[] | undefined,
  restaurantId: string,
) => {
  const isFavorite = userFavoritesRestaurants
    ? userFavoritesRestaurants.some((fav) => fav.restaurantId === restaurantId)
    : false;
  return isFavorite;
};
