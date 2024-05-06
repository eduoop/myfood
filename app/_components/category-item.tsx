import React from "react";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex min-w-fit items-center gap-3 rounded-full bg-white px-4 py-1 shadow-sm"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        sizes="100%"
        height={30}
        width={30}
      />
      <p className="text-sm font-semibold">{category.name}</p>
    </Link>
  );
}

export default CategoryItem;
