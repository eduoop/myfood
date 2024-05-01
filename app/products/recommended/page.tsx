import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import React from "react";

async function Recommended() {
  // TODO pegar produtos com mais pedidos
  const products = await db.product.findMany({
    include: {
      restaurant: true,
    },
    take: 20,
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Produtos Recomendados</h2>

        <div className="grid w-full grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Recommended;
