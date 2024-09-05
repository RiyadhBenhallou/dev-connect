import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/rooms";
import SearchBar from "../../components/serach-bar";
import RoomCard from "@/components/room-card";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Image from "next/image";
import image from "../../undraw_no_data_re_kwbl.svg";

export default async function Home({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) {
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/browse`);
  }
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
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center w-full mt-8">
          <Image src={image} width={200} height={200} alt="No data found" />
          <span className="text-2xl text-gray-500">No Rooms Yet!</span>
        </div>
      )}
    </main>
  );
}
