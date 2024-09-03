import { auth } from "@/auth";
import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}
