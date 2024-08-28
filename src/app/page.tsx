import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const rooms = await db.query.room.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {rooms.map((room) => {
        return (
          <div
            key={room.id}
            className="max-w-sm w-full sm:max-w-md rounded-md overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4">
              <div className="text-xl font-bold">{room.name}</div>
              <p className="mt-2 text-sm text-gray-500">{room.description}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}
