import React, { memo, useContext } from "react";
import { CartContext, CartProduct } from "../_contexts/cart";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Trash,
  TrashIcon,
} from "lucide-react";

interface CartItemProps {
  cartProduct: CartProduct;
}

function CartItem({ cartProduct }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      {/* IMAGEM E INFO */}
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            fill
            className="rounded-lg object-cover"
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <div className="flex select-none items-center text-center">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="h-7 w-7 border border-solid border-muted-foreground"
                onClick={() => decreaseProductQuantity(cartProduct.id)}
                disabled={cartProduct.quantity === 1}
              >
                <ChevronLeftIcon size={18} />
              </Button>
              <span className="block w-8 text-sm">{cartProduct.quantity}</span>
              <Button
                onClick={() => increaseProductQuantity(cartProduct.id)}
                size={"icon"}
                className="h-7 w-7"
              >
                <ChevronRightIcon size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÂO DE DELETAR */}
      <Button
        onClick={() => removeProductFromCart(cartProduct.id)}
        size={"icon"}
        variant={"ghost"}
        className="h-7 w-7 border border-solid border-muted-foreground"
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
}

export default memo(CartItem);
