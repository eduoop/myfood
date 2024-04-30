import React from "react";
import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex min-w-fit items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <p className="text-sm font-semibold">{category.name}</p>
    </div>
  );
}

export default CategoryItem;
