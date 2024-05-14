import React from "react";
import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

async function ResponsiveCategoryList() {
  const categories = await db.category.findMany({});

  return (
    <>
      <div className="flex gap-2 overflow-x-scroll px-5 pb-1 pt-6 tablet:hidden [&&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>

      <div className="hidden tablet:block">
        <div className="grid w-full grid-cols-6 gap-3 px-5 py-10 laptop:px-44">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ResponsiveCategoryList;
