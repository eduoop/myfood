import React, { useContext } from "react";
import { CartContext } from "../_contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

function Cart() {
  const { products, subTotalPrice, totalDiscount, totalPrice } =
    useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {/* TOTAIS */}

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
            {Number(products[0].restaurant.deliveryFee) === 0 ? (
              <span className="uppercase text-primary">Gratis</span>
            ) : (
              formatCurrency(Number(products[0].restaurant.deliveryFee))
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
    </div>
  );
}

export default Cart;
