import React from "react";
import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

async function ResponsiveCategoryList() {
  const categories = await db.category.findMany({});

  return (
    <>
      <div className="flex gap-2 overflow-x-scroll px-5 pb-1 pt-6 desktop:hidden [&&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

      <div className="hidden w-full items-center justify-center desktop:flex">
        <div className="flex w-full justify-between px-44 py-10">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ResponsiveCategoryList;
