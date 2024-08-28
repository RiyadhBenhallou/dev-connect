import CreateRoomForm from "./create-room-form";

const CreateRoom = () => {
  return (
    <div className="container mx-auto flex flex-col gap-4 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
};
export default CreateRoom;
