"use server";

import { auth } from "@/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await auth();

  if (!session) {
    throw new Error("No session found");
  }

  const api_key = "kh7fh56nwphf";
  const api_secret =
    "sq2gfnbpayhaqf9nfnveubz9wcppxsn4rk6jsj5gxrbst6vstvehrf2y3pk4kzg8";
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(session?.user?.id!);
  //   console.log("token", token);
  return token;
}
