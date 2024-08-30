"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createRoom(roomData: Omit<Room, "userId" | "id">) {
  const session = await auth();
  if (!session) {
    throw new Error("You should be authenticated to do this action");
  }
  console.log(session);
  await db.insert(room).values({
    ...roomData,
    userId: session?.user?.id!,
  });
  revalidatePath("/");
}
