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
import { toast } from "@/hooks/use-toast";
import { Github, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { deleteRoom } from "./actions";

const UserRoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="flex flex-col relative justify-between h-full">
      <Button
        asChild
        size={"icon"}
        variant={"ghost"}
        className="absolute top-1 right-1 size-6 sm:size-8"
      >
        <Link href={`/edit-room/${room.id}`}>
          <Pencil size={18} className="sm:size-5" />
        </Link>
      </Button>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{room.name}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {room.description}
        </CardDescription>
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
      <CardFooter className="flex items-center gap-2 mt-auto">
        <Button
          asChild
          className="text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4"
        >
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        <DeletionDialog
          deletionAction={async () => {
            await deleteRoom(room.id);
            toast({
              title: "Room Deleted Successfully",
              description: "Your room was successfully Deleted",
              variant: "destructive",
            });
          }}
        >
          <Button variant="destructive" size={"icon"}>
            <Trash size={19} />
          </Button>
        </DeletionDialog>
      </CardFooter>
    </Card>
  );
};

export default UserRoomCard;
