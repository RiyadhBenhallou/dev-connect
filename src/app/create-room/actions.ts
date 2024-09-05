"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRoom(roomData: Omit<Room, "userId" | "id">) {
  const session = await auth();
  if (!session) {
    throw new Error("You should be authenticated to do this action");
  }
  const createdRoom = await db
    .insert(room)
    .values({
      ...roomData,
      userId: session?.user?.id!,
    })
    .returning();
  revalidatePath("/");
  redirect(`/rooms/${createdRoom[0].id}`);
}
