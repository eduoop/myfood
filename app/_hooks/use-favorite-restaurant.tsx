import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../_actions/restaurant";
import { toast } from "../_components/ui/use-toast";

interface UseFavoriteRestaurantProps {
  restaurantId: string;
  isFavorite?: boolean;
  userId?: string;
}

const useFavoriteRestaurant = ({
  restaurantId,
  isFavorite,
  userId,
}: UseFavoriteRestaurantProps) => {
  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      if (isFavorite) {
        await unfavoriteRestaurant(userId, restaurantId);
        return toast({ title: "Restaurante removido dos favoritos" });
      }

      try {
        await favoriteRestaurant(userId, restaurantId);
        toast({ title: "Restaurante favoritado com sucesso!" });
      } catch (error) {
        toast({ title: "Erro ao favoritar o restaurante" });
      }
    } catch (error) {
      toast({ title: "Erro ao favoritar o restaurante" });
    }
  };

  return { handleFavoriteClick };
};

export default useFavoriteRestaurant;
