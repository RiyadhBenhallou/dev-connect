import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/services/rooms";
import Link from "next/link";
import UserRoomCard from "./user-room-card";
import { unstable_noStore } from "next/cache";

export default async function YourRooms() {
  unstable_noStore();
  const rooms = await getUserRooms();
  return (
    <main className="min-h-screen p-24">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button>
          <Link href={"/create-room"}>Create a room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <UserRoomCard key={room?.id} room={room} />;
        })}
      </div>
    </main>
  );
}
