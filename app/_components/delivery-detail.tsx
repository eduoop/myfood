import React from "react";
import { Card } from "./ui/card";
import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryDetailProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

function DeliveryDetail({ restaurant: restaurant }: DeliveryDetailProps) {
  return (
    <Card className="mt-6 flex justify-around py-3 ">
      {/* CUSTO */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs laptop:text-[14px]">Entrega</span>
          <BikeIcon className="h-[14px] w-[14px] laptop:h-[17px] laptop:w-[17px]" />
        </div>

        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold laptop:text-sm">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-x laptop:text-sms font-semibold">Grátis</p>
        )}
      </div>

      {/* TEMPO */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs laptop:text-[14px]">Entrega</span>
          <TimerIcon className="h-[14px] w-[14px] laptop:h-[17px] laptop:w-[17px]" />
        </div>

        <p className="text-xs font-semibold laptop:text-sm">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  );
}

export default DeliveryDetail;
