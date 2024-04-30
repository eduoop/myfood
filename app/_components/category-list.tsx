import React from "react";
import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className="flex gap-2 overflow-x-scroll pb-1 [&&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;
