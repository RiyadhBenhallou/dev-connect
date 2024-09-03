"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Room, room, sessions } from "@/db/schema";
import { getRoom } from "@/services/rooms";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateRoom(roomData: Omit<Room, "userId">) {
  const session = await auth();
  if (!session) {
    throw new Error("You should be authenticated to do this action");
  }
  const toUpdateRoom = await getRoom(roomData.id);
  if (session.user?.id != toUpdateRoom?.userId) {
    throw new Error("You can only update your own rooms");
  }
  await db
    .update(room)
    .set({ ...roomData, userId: toUpdateRoom?.userId })
    .where(eq(room.id, roomData.id));
  revalidatePath(`/your-rooms`);
}
