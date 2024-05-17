"use client";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import React, { useState } from "react";
import ReviewRestaurantSheet from "./review-restaurant-sheet";
import { useToast } from "@/app/_components/ui/use-toast";

function ReviewRestaurantTrigger({
  children,
  restaurantId,
  userId,
}: {
  children: React.ReactNode;
  restaurantId: string;
  userId?: string;
}) {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const handleAvailableClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Voce precisa estar logado para avaliar o restaurante",
      });
      return;
    }

    setOpen(true);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={(e) => handleAvailableClick(e)}>
        {children}
      </SheetTrigger>

      <ReviewRestaurantSheet
        defaultValues={{
          description: "",
          note: 0,
        }}
        restaurantId={restaurantId}
        setOpen={setOpen}
        userId={userId}
      />
    </Sheet>
  );
}

export default ReviewRestaurantTrigger;
