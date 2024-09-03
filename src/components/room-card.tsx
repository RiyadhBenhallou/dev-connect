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

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center text-sm gap-2"
            target="_blank"
          >
            <Github size={18} />
            GitHub Link
          </Link>
        )}
        <TagsList tagsString={room.tags} />
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
