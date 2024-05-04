"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_contexts/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { cn } from "@/app/_lib/utils";
import { Order, OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

function OrderItem({ order }: OrderItemProps) {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();

  const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "CANCELED":
        return "Cancelado";
      case "DELIVERING":
        return "A caminho";
      case "CONFIRMED":
        return "Confirmado";
      case "COMPLETED":
        return "Entregue";
      case "PREPARING":
        return "Preparando";
    }
  };

  const handlerRedoOrder = () => {
    for (const orderProduct of order.products) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }
    router.push(`/restaurants/${order.restaurant.id}`);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={cn(
            "w-fit rounded-full bg-[#5DC05B] px-2 py-1 text-white",
            {
              "bg-[#EA1D2C]": order.status === "CANCELED",
              "bg-muted text-muted-foreground": order.status === "COMPLETED",
            },
          )}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order?.restaurant?.imageUrl} />
              <AvatarFallback />
            </Avatar>

            <span className="block text-sm font-semibold">
              {order?.restaurant?.name}
            </span>
          </div>

          <Button
            variant={"link"}
            size={"icon"}
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${order?.restaurant?.id}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {orderProduct.quantity}
                </span>
              </div>
              <span className="block text-xs text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            {formatCurrency(Number(order.totalPrice))}
          </p>

          <Button
            disabled={order.status !== "COMPLETED"}
            variant={"ghost"}
            className="text-xs text-primary"
            size={"sm"}
            onClick={handlerRedoOrder}
          >
            Pedir novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItem;
