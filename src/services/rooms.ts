import { db } from "@/db";
import { unstable_noStore } from "next/cache";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getRooms() {
  unstable_noStore();
  return await db.query.room.findMany();
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
