import Image, { ImageProps } from "next/image";
import React from "react";

function PromoBanner(props: ImageProps) {
  return (
    <Image
      width={0}
      height={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={100}
      {...props}
    />
  );
}

export default PromoBanner;
