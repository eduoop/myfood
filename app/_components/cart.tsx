"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "../_contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import { createOrder } from "../_actions/order";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useToast } from "@/app/_components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
}

function Cart({ setIsOpen }: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { products, subTotalPrice, totalDiscount, totalPrice, clearCart } =
    useContext(CartContext);

  const { data } = useSession();

  const handleFinishOrder = async () => {
    if (!data?.user) return;

    setIsLoading(true);

    const restaurant = products[0].restaurant;

    try {
      await createOrder({
        subtotalPrice: subTotalPrice,
        totalDiscounts: totalDiscount,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        status: "CONFIRMED",
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
      setIsOpen(false);
      toast({
        title: "Pedido finalizado com sucesso ",
        description: "Você pode acompanha-lo na tela de seus pedidos",
        action: (
          <ToastAction
            onClick={() => router.push("/my-orders")}
            altText="Goto schedule to undo"
          >
            Acompanhar
          </ToastAction>
        ),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>

            <Card className="mt-6">
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subTotalPrice)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Descontos</span>
                  <span>- {formatCurrency(totalDiscount)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Gratis</span>
                  ) : (
                    formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>

            {/* BOTÃO DE FINALIZAR PEDIDO */}
            <Button
              onClick={() => setIsConfirmedOpen(true)}
              className="mt-6 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finalizando...
                </>
              ) : (
                <>Finalizar pedido</>
              )}
            </Button>
          </>
        ) : (
          <>
            <h2>Sua sacola está vazia. </h2>
            <Link
              href={"/"}
              className="text-[17px] font-medium text-primary underline"
            >
              Adicionar itens
            </Link>
          </>
        )}
      </div>

      <AlertDialog open={isConfirmedOpen} onOpenChange={setIsConfirmedOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja finalizar seu pedido?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, não poderá mais alterar os itens.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {!isLoading && <AlertDialogCancel>Cancel</AlertDialogCancel>}

            <AlertDialogAction onClick={handleFinishOrder}>
              Finalizar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Cart;
