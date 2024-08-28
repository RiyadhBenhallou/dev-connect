import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const result = await db.query.testing.findMany();
  console.log(result);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      next
    </main>
  );
}
