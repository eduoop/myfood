"use server";

import { db } from "@/app/_lib/prisma";

interface UserReviewProps {
  note: number;
  feedback: string;
  userId: string;
  restaurantId: string;
}

export const sendReview = async ({
  note,
  feedback,
  userId,
  restaurantId,
}: UserReviewProps) => {
  const existNote = await db.userNoteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (existNote) {
    return new Error("Voce ja avaliou este restaurante");
  }

  await db.userNoteRestaurant.create({
    data: {
      note,
      comment: feedback,
      userId,
      restaurantId,
    },
  });
};
