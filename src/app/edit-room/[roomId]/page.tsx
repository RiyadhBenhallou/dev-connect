import { auth } from "@/auth";
import { getRoom } from "@/services/rooms";
import { notFound, redirect } from "next/navigation";
import EditRoomForm from "./edit-room-form";
import { unstable_noStore } from "next/cache";

const EditRoom = async ({
  params: { roomId },
}: {
  params: { roomId: string };
}) => {
  unstable_noStore();
  const room = await getRoom(roomId);
  if (!room) {
    return notFound();
  }
  const session = await auth();

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/edit-room/${roomId}`);
  }

  if (session.user?.id != room.userId) {
    return notFound();
  }

  return (
    <div className="container mx-auto flex flex-col gap-4 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
};
export default EditRoom;
