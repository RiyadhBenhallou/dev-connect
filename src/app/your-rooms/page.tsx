import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/services/rooms";
import Link from "next/link";
import UserRoomCard from "./user-room-card";
import { unstable_noStore } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import image from "../../undraw_no_data_re_kwbl.svg";
export default async function YourRooms() {
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/your-rooms`);
  }
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
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center w-full mt-8">
          <Image src={image} width={200} height={200} alt="No data found" />
          <span className="text-2xl text-gray-500">No Rooms Yet!</span>
        </div>
      )}
    </main>
  );
}
