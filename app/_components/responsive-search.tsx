import React from "react";
import Search from "./search";
import Image from "next/image";

function ResponsiveSearch() {
  return (
    <>
      <div className="px-5 pt-6 laptop:hidden ">
        <Search
          defaultValues={{
            search: "",
          }}
        />
      </div>

      <div className="relative hidden h-[500px] w-full bg-[#EA1D2C] laptop:block">
        <div className="absolute left-20 top-32 z-10 w-fit">
          <h1 className="text-5xl font-bold text-white">Está com fome?</h1>
          <p className="mb-8 mt-3 text-lg font-[400] text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <div className="rounded-md bg-white p-6 shadow-md">
            <Search
              defaultValues={{
                search: "",
              }}
            />
          </div>
        </div>

        <Image
          src="/search-image.png"
          alt="Hero image"
          height={370}
          width={370}
          className="absolute bottom-0 right-52 z-0 hidden brightness-110 contrast-125 laptop:block"
        />
      </div>
    </>
  );
}

export default ResponsiveSearch;
