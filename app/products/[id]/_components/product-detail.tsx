"use client";

import DeliveryDetail from "@/app/_components/delivery-detail";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductsList from "@/app/_components/products-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { CartContext } from "@/app/_contexts/cart";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma, Product } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../_components/ui/sheet";
import Cart from "@/app/_components/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

interface ProductDetailProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

function ProductDetail({ product, complementaryProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;
  const { addProductToCart, products } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < maxQuantity) {
        return prevQuantity + 1;
      }
      return maxQuantity;
    });
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return 1;
    });
  };

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, quantity, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCart = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationOpen(true);
    }
    addToCart({ emptyCart: false });
  };

  return (
    <>
      <div className="relative mt-[-1.5rem] rounded-t-3xl bg-white py-6">
        <div className="flex items-center gap-[0.375rem] px-5">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        {/* NOME DO PRODUTO */}
        <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

        {/* PREÇO DO PRODUTO E QUANTIDADE */}
        <div className="flex w-full items-center justify-between px-5">
          {/* PREÇO COM DESCONTO */}
          <div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {formatCurrency(calculateProductTotalPrice(product))}
                </h2>
                {product.discountPercentage > 0 && (
                  <DiscountBadge product={product} />
                )}
              </div>
            </div>

            {/* PREÇO SEM DESCONTO */}

            {product.discountPercentage > 0 && (
              <span className="block text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          {/* Quantidade */}
          <div className="flex select-none items-center gap-3 text-center">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantity}
              disabled={quantity === 1}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button
              disabled={quantity === maxQuantity}
              size={"icon"}
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* DADOS DA ENTREGA */}
        <div className="px-5">
          <DeliveryDetail restaurant={product.restaurant} />
        </div>

        {/* DESCRIÇÂO */}
        <div className="my-6 space-y-3 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="my-6 space-y-3">
          <h3 className="px-5 font-semibold">Sucos</h3>
          <ProductsList products={complementaryProducts} />
        </div>

        <div className="mt-6 px-5">
          <Button onClick={handleAddToCart} className="w-full font-semibold">
            Adicionar á sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[85vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você so pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto? Isso limpará sua sacola
              atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ProductDetail;
