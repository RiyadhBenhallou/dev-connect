import TagsList from "@/components/tags-list";
import { Badge } from "@/components/ui/badge";
import { getRoom } from "@/services/rooms";
import { splitTags } from "@/utils/tags";
import { Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoPlayer from "./video-player";
import { auth } from "@/auth";

export default async function RoonPage({
  params: { roomId },
}: {
  params: { roomId: string };
}) {
  const room = await getRoom(roomId);
  const session = await auth();
  console.log(session);
  console.log(room);

  if (!room) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm drop-shadow-lg p-4">
          <VideoPlayer room={room} session={session!} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm drop-shadow-lg p-4 flex flex-col gap-4">
          <h1 className="text-base font-bold">{room?.name}</h1>
          {room?.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex gap-2 items-center text-sm"
              target="_blank"
            >
              <Github size={18} />
              GitHub Link
            </Link>
          )}
          <p className="text-sm font-light">{room?.description}</p>
          <TagsList tagsString={room.tags} />
        </div>
      </div>
    </div>
  );
}
