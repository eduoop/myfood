import React from "react";
import { db } from "../_lib/prisma";
import { useSession } from "next-auth/react";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";

async function MyOrders() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-3 py-6 laptop:px-44">
        <h2 className="text-lg font-semibold laptop:mb-5 laptop:text-xl">
          Meus Pedidos
        </h2>

        <div className="space-y-4 pt-1 ">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyOrders;
