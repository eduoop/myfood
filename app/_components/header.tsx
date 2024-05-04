"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

function Header() {
  const { data, status } = useSession();

  const handleLogin = () => {
    signIn("google");
  };

  const handleSignOut = () => {
    signOut();
  };

  const isLogged = data?.user ? true : false;

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href={"/"}>
        <div className="relative h-[30px] w-[100px]">
          <Image src="/logo.png" alt="iclone" fill className="object-contain" />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger>
          <Button
            size={"icon"}
            variant={"outline"}
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex items-center gap-3 pt-6">
                <Avatar>
                  <AvatarImage src={data?.user?.image as string | undefined} />
                  <AvatarFallback>
                    {data?.user?.name?.split("")[0][0]}
                    {data?.user?.name?.split("")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{data?.user?.name}</h3>
                  <span className="block truncate text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login</h2>
                <Button size={"icon"} onClick={handleLogin}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {isLogged && (
              <>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href={"/my-orders"}>
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <HeartIcon size={16} className="min-h-[16px] min-w-[16px]" />
                  <span className="block truncate">Restaurantes favoritos</span>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {isLogged && (
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleSignOut}
            >
              <LogOutIcon size={16} className="min-h-[16px] min-w-[16px]" />
              <span className="truncate">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Header;
