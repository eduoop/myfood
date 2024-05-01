"use client";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductImageProps {
  product: Pick<Product, "imageUrl" | "name">;
}

function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[360px] w-full">
      <Image
        className="object-cover"
        src={product.imageUrl}
        alt={product.name}
        fill
      />

      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:bg-primary-foreground/90"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon className="mr-[2px]" />
      </Button>
    </div>
  );
}

export default ProductImage;
