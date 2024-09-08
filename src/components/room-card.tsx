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
import TagsList from "@/components/tags-list";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="flex flex-col relative justify-between h-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{room.name}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center text-xs sm:text-sm gap-1 sm:gap-2"
            target="_blank"
          >
            <Github size={16} className="sm:size-5" />
            GitHub Link
          </Link>
        )}
        <TagsList tagsString={room.tags} />
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4">
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
