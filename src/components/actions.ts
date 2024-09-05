"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { room, users } from "@/db/schema";
import { deleteAccount } from "@/services/users";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function deleteAccountAction() {
  const session = await auth();

  if (!session) {
    throw new Error("You should be authenticated to delete your account");
  }
  const userId = session.user?.id!;
  await deleteAccount(userId);
  //   redirect("/");
}
