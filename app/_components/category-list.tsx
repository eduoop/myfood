import React from "react";
import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className="flex overflow-x-scroll">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;
