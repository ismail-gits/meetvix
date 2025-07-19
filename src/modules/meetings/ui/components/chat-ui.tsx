import { useState, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import type { Channel as StreamChannel } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
  Window,
} from "stream-chat-react";

import { LoadingState } from "@/components/loading-state";

import "stream-chat-react/dist/css/v2/index.css";

interface ChatUIProps {
  meetingId: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

export const ChatUI = ({
  meetingId,
  userId,
  userName,
  userImage,
}: ChatUIProps) => {
  const [channel, setChannel] = useState<StreamChannel>();
  const trpc = useTRPC();

  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions()
  );

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage,
    },
  });

  useEffect(() => {
    if (!client) {
      return;
    }

    const channel = client.channel("messaging", meetingId, {
      members: [userId],
    });

    setChannel(channel);
  }, [client, meetingId, userId]);

  if (!client) {
    return (
      <LoadingState
        title="Loading Chat"
        description="This may take a few seconds..."
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-18rem)] border-b">
              <MessageList />
            </div>
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
