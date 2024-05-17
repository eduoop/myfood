import ArrowBack from "@/app/_components/arrow-back";
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

      <div className="mb-6 px-5 pt-3 laptop:px-44">
        <ArrowBack />
      </div>

      <div className="px-5 laptop:px-44">
        <h2 className="mb-6 text-lg font-semibold">Produtos Recomendados</h2>

        <div className="grid w-full grid-cols-2 gap-6 laptop:grid laptop:grid-cols-5 desktop:grid-cols-6">
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
