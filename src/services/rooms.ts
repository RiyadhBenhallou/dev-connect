import { db } from "@/db";
import { room } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { auth } from "@/auth";

export const LIMIT = 6;

export async function getRooms(query?: string, page: number = 1) {
  const condition = query ? like(room.tags, `%${query}%`) : undefined;
  return await db.query.room.findMany({
    where: condition,
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });
}

export async function getUserRooms(page: number = 1) {
  const session = await auth();
  if (!session) {
    throw new Error("You should be authenticated to get user rooms");
  }
  return await db.query.room.findMany({
    where: eq(room.userId, session.user?.id!),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
