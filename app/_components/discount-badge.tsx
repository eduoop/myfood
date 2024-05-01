import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import React from "react";

interface ProductItemProps {
  product: Pick<Product, "discountPercentage">;
}

function DiscountBadge({ product }: ProductItemProps) {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
}

export default DiscountBadge;
