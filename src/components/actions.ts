"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { Notification, notification, room, users } from "@/db/schema";
import { deleteAccount } from "@/services/users";
import { desc, eq } from "drizzle-orm";
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

export async function fetchNotifications() {
  const session = await auth();
  if (!session) {
    throw new Error("You are not authorized");
  }
  try {
    const notifications = await db.query.notification.findMany({
      where: eq(notification.userId, session?.user?.id!),
      limit: 5,
      orderBy: desc(notification.createdAt),
    });
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

export async function markAsRead(notificationObject: Notification) {
  try {
    await db
      .update(notification)
      .set({ isRead: true })
      .where(eq(notification.id, notificationObject.id));
  } catch (error) {
    console.log(error);
  }
}
