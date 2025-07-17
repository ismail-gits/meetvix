import Link from "next/link";
import { VideoIcon } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

interface ActiveStateProps {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: ActiveStateProps) => {
  return (
    <div className="bg-white rounde-lg px-4 py-5 flex items-center justify-center flex-col gap-y-8">
      <EmptyState
        title="Meeting is active"
        description="Meeting will end once all participants have left"
        image="/upcoming.svg"
      />
      <Button asChild className="w-full lg:w-auto">
        <Link href={`/call/${meetingId}`}>
          <VideoIcon />
          Join meeting
        </Link>
      </Button>
    </div>
  );
};
