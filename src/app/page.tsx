import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Github } from "lucide-react";
import { getRooms } from "@/services/rooms";

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link href={room.githubRepo} className="flex gap-2" target="_blank">
            <Github size={20} />
            Github Link
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/room/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default async function Home() {
  const rooms = await getRooms();
  return (
    <main className="min-h-screen p-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button>
          <Link href={"/create-room"}>Create a room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room?.id} room={room} />;
        })}
      </div>
    </main>
  );
}
