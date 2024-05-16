"use client";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import React, { useState } from "react";
import ReviewRestaurantSheet from "./review-restaurant-sheet";

function ReviewRestaurantTrigger({
  children,
  restaurantId,
}: {
  children: React.ReactNode;
  restaurantId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)}>{children}</SheetTrigger>

      <ReviewRestaurantSheet
        defaultValues={{
          description: "",
          note: 0,
        }}
        restaurantId={restaurantId}
        setOpen={setOpen}
      />
    </Sheet>
  );
}

export default ReviewRestaurantTrigger;
