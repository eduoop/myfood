/*
  Warnings:

  - You are about to drop the `UserFavouriteRestaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavouriteRestaurant" DROP CONSTRAINT "UserFavouriteRestaurant_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavouriteRestaurant" DROP CONSTRAINT "UserFavouriteRestaurant_userId_fkey";

-- DropTable
DROP TABLE "UserFavouriteRestaurant";

-- CreateTable
CREATE TABLE "UserFavoriteRestaurant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "UserFavoriteRestaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavoriteRestaurant" ADD CONSTRAINT "UserFavoriteRestaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteRestaurant" ADD CONSTRAINT "UserFavoriteRestaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
