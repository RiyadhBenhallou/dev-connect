import { Button } from "@/components/ui/button";
import { getUserRooms, LIMIT } from "@/services/rooms";
import Link from "next/link";
import UserRoomCard from "./user-room-card";
import { unstable_noStore } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import image from "../../undraw_no_data_re_kwbl.svg";
import PaginationControl from "./pagination-control";

export default async function YourRooms({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/your-rooms`);
  }
  unstable_noStore();
  const rooms = await getUserRooms(parseInt(page));
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-16 lg:p-24">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-0">
          Your Rooms
        </h1>
        <Button className="w-full sm:w-auto">
          <Link href={"/create-room"}>Create a room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <UserRoomCard key={room?.id} room={room} />;
        })}
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center w-full mt-12 sm:mt-24">
          <Image
            src={image}
            width={150}
            height={150}
            alt="No data found"
            className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64"
          />
          <span className="text-xl sm:text-2xl text-gray-500 font-light text-center">
            No Rooms Yet!
          </span>
        </div>
      )}
      {rooms.length !== 0 && (
        <PaginationControl
          current={page || 1}
          hasNextPage={rooms.length === LIMIT}
        />
      )}
    </main>
  );
}
