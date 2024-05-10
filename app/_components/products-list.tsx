import React from "react";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";
import { Prisma } from "@prisma/client";

interface ProductsListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <>
      <div className="flex gap-4 overflow-x-scroll px-5 laptop:hidden [&&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>

      <div className="hidden gap-5 px-44 laptop:grid laptop:grid-cols-5 desktop:grid-cols-7">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default ProductsList;
