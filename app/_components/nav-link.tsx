import React from "react";
import { Button } from "./ui/button";
import { HomeIcon, LucideProps } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface NavLinkProps {
  title: string;
  href: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

function NavLink({ title, href, Icon }: NavLinkProps) {
  const isCurrentPath = href === window.location.pathname ? true : false;

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "w-full justify-start space-x-3 rounded-full text-sm font-normal",
        {
          "bg-[#EA1D2C] font-bold text-white hover:bg-[#EA1D2C] hover:text-white":
            isCurrentPath,
        },
      )}
      asChild
    >
      <Link href={href}>
        <Icon size={16} />
        <span className="block">{title}</span>
      </Link>
    </Button>
  );
}

export default NavLink;
