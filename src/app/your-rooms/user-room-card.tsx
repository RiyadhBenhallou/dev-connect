"use client";
import { DeletionDialog } from "@/components/deletion-dialog";
import TagsList from "@/components/tags-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Github, Trash } from "lucide-react";
import Link from "next/link";
import { deleteRoom } from "./actions";

const UserRoomCard = ({ room }: { room: Room }) => {
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
      <CardFooter className="flex items-center gap-2">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        <DeletionDialog deleteRoomAction={() => deleteRoom(room.id)}>
          <Button variant="destructive" size={"icon"}>
            <Trash size={19} />
          </Button>
        </DeletionDialog>
      </CardFooter>
    </Card>
  );
};

export default UserRoomCard;
