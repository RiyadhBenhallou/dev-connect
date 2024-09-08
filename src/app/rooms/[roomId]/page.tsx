import { auth } from "@/auth";
import TagsList from "@/components/tags-list";
import { getRoom } from "@/services/rooms";
import { Github } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoPlayer from "./video-player";

export default async function RoonPage({
  params: { roomId },
}: {
  params: { roomId: string };
}) {
  unstable_noStore();
  const room = await getRoom(roomId);
  const session = await auth();
  console.log(session);
  console.log(room);

  if (!room) {
    return notFound();
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 min-h-screen">
      <div className="lg:col-span-3 p-2 sm:p-4 lg:pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm drop-shadow-lg p-2 sm:p-4">
          <VideoPlayer room={room} session={session!} />
        </div>
      </div>
      <div className="lg:col-span-1 p-2 sm:p-4 lg:pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm drop-shadow-lg p-4 flex flex-col gap-4">
          <h1 className="text-base sm:text-lg font-bold">{room?.name}</h1>
          {room?.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex gap-2 items-center text-sm sm:text-base"
              target="_blank"
            >
              <Github size={18} className="sm:w-5 sm:h-5" />
              GitHub Link
            </Link>
          )}
          <p className="text-sm sm:text-base font-light">{room?.description}</p>
          <TagsList tagsString={room.tags} />
        </div>
      </div>
    </div>
  );
}
