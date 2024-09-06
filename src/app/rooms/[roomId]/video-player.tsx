"use client";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateTokenAction } from "./actions";

export default function VideoPlayer({
  room,
  session,
}: {
  room: Room;
  session: Session;
}) {
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY as string;
  // const session = useSession();
  const [client, setClient] = useState<null | StreamVideoClient>(null);
  const [call, setCall] = useState<null | Call>(null);
  useEffect(() => {
    if (!room) {
      return;
    }
    if (!session) {
      return;
    }
    const user: User = {
      id: session?.user?.id!,
      name: session?.user?.name!,
      image: session?.user?.image!,
    };
    const client = new StreamVideoClient({
      apiKey,
      user,
      tokenProvider: () => generateTokenAction(),
    });
    setClient(client);
    // client.connectUser(user, token);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);

    return () => {
      client.disconnectUser();
      setClient(null);
      setCall(null);
    };
  }, [session, room, apiKey]);
  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <StreamCall call={call}>
              <SpeakerLayout />
              <CallControls
                onLeave={() => {
                  router.push("/");
                }}
              />
              <CallParticipantsList onClose={() => undefined} />
            </StreamCall>
            {/* <MyVideoUI /> */}
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    )
  );
}
