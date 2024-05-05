-- CreateTable
CREATE TABLE "UserFavouriteRestaurant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "UserFavouriteRestaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavouriteRestaurant" ADD CONSTRAINT "UserFavouriteRestaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavouriteRestaurant" ADD CONSTRAINT "UserFavouriteRestaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
