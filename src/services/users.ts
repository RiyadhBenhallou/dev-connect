import { db } from "@/db";
import { room, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteAccount(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}
