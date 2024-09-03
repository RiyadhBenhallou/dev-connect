"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { room } from "@/db/schema";
import { getRoom } from "@/services/rooms";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteRoom(roomId: string): Promise<void> {
  const session = await auth();
  if (!session) {
    throw new Error("You should be authenticated to delete a room");
  }
  const toDeleteRoom = await getRoom(roomId);
  if (session?.user?.id !== toDeleteRoom?.userId) {
    throw new Error("You can only delete your own rooms");
  }
  await db.delete(room).where(eq(room.id, roomId));
  revalidatePath("/your-rooms");
}
