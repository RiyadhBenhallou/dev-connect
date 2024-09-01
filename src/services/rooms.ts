import { db } from "@/db";
import { unstable_noStore } from "next/cache";
import { room } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function getRooms(query: string | undefined) {
  unstable_noStore();
  const options = query ? { where: like(room.tags, `%${query}%`) } : undefined;
  return await db.query.room.findMany(options);
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
