"use client";
import { CartContext } from "@/app/_contexts/cart";
import React, { useContext } from "react";
import { Restaurant } from "@prisma/client";
import { formatCurrency } from "@/app/_helpers/price";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

function CartBanner({ restaurant }: CartBannerProps) {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductOnCart = products.filter(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductOnCart.length) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 right-0 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">
              Total sem entrega
            </span>
            <h3 className="font-semibold">
              {formatCurrency(totalPrice)}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </h3>
          </div>
          <Sheet>
            <SheetTrigger>
              <Button>Ver sacola</Button>
            </SheetTrigger>
            <SheetContent className="w-[85vw]">
              <SheetHeader>
                <SheetTitle className="text-left">Sacola</SheetTitle>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default CartBanner;
