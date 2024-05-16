-- CreateTable
CREATE TABLE "UserNoteRestaurant" (
    "id" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNoteRestaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserNoteRestaurant" ADD CONSTRAINT "UserNoteRestaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNoteRestaurant" ADD CONSTRAINT "UserNoteRestaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
