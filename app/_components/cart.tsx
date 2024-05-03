import React, { useContext } from "react";
import { CartContext } from "../_contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import { StoreIcon } from "lucide-react";

function Cart() {
  const { products, subTotalPrice, totalDiscount, totalPrice } =
    useContext(CartContext);

  return (
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
          <Button className="mt-6 w-full">Finalizar pedido</Button>
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
  );
}

export default Cart;
