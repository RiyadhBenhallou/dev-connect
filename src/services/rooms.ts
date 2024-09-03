import { db } from "@/db";
import { room } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { auth } from "@/auth";

export async function getRooms(query: string | undefined) {
  const options = query ? { where: like(room.tags, `%${query}%`) } : undefined;
  return await db.query.room.findMany(options);
}

export async function getUserRooms() {
  const session = await auth();
  if (!session) {
    throw new Error("You should be authenticated to get user rooms");
  }
  return await db.query.room.findMany({
    where: eq(room.userId, session.user?.id!),
  });
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
