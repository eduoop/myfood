import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductsList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search
          defaultValues={{
            search: "",
          }}
        />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src={"/promobanner-1.png"}
          alt="Até 30% de descontos em pizzas"
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            asChild
            variant={"ghost"}
            className="h-fit cursor-pointer p-0 text-primary hover:bg-transparent hover:text-primary/75"
          >
            <div>
              <Link href="/products/recommended">Ver Todos</Link>
              <ChevronRightIcon size={16} />
            </div>
          </Button>
        </div>
        <ProductsList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src={"/promobanner-2.png"}
          alt="Até 30% de descontos em pizzas"
        />
      </div>

      <div className="space-y-4 px-5 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            asChild
            variant={"ghost"}
            className="h-fit cursor-pointer p-0 text-primary hover:bg-transparent hover:text-primary/75"
          >
            <div>
              <Link href="/restaurants/recommended">Ver Todos</Link>
              <ChevronRightIcon size={16} />
            </div>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
