import { useState } from "react";

import { StreamTheme, useCall } from "@stream-io/video-react-sdk";

import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";
import { toast } from "sonner";

interface CallUiProps {
  meetingName: string;
}

export const CallUI = ({ meetingName }: CallUiProps) => {
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const call = useCall();

  const handleJoin = async () => {
    if (!call) {
      return;
    }

    try {
      await call.join();
      setShow("call");
    } catch (error) {
      console.error("Failed to join call: " + error);
      toast.error("Failed to join call");
    }
  };

  const handleLeave = () => {
    if (!call) {
      return;
    }

    call.endCall();
    toast.success("Call ended");

    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
