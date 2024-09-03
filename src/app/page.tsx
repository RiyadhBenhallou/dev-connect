import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/rooms";
import SearchBar from "../components/serach-bar";
import RoomCard from "@/components/room-card";
import { unstable_noStore } from "next/cache";

export default async function Home({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  unstable_noStore();
  const rooms = await getRooms(query);
  return (
    <main className="min-h-screen p-24">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button>
          <Link href={"/create-room"}>Create a room</Link>
        </Button>
      </div>
      <SearchBar />
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room?.id} room={room} />;
        })}
      </div>
    </main>
  );
}
