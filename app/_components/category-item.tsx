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
      className="flex min-w-fit items-center gap-3 rounded-full bg-white px-4 py-1 shadow-md tablet:min-w-full"
    >
      <div className="relative h-[30px] w-[30px] laptop:h-[45px] laptop:w-[45px]">
        <Image
          src={category.imageUrl}
          alt={category.name}
          sizes="100%"
          fill
          className="object-contain"
        />
      </div>

      <p className="truncate text-sm font-semibold laptop:text-[16px]">
        {category.name}
      </p>
    </Link>
  );
}

export default CategoryItem;
