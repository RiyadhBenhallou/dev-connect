"use server";

import { auth } from "@/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await auth();

  if (!session) {
    throw new Error("No session found");
  }

  const api_key = process.env.STREAMCHAT_API_KEY;
  const api_secret = process.env.STREAMCHAT_API_SECRET;
  const serverClient = StreamChat.getInstance(
    api_key as string,
    api_secret as string
  );
  const token = serverClient.createToken(session?.user?.id!);
  //   console.log("token", token);
  return token;
}
