import React, { Suspense } from "react";
import Restaurants from "./_components/resturants";

function RestaurantsPage() {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
}

export default RestaurantsPage;
