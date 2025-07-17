import Link from "next/link";
import { BanIcon, VideoIcon } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

interface UpcomingStateProps {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: UpcomingStateProps) => {
  return (
    <div className="bg-white rounde-lg px-4 py-5 flex items-center justify-center flex-col gap-y-8">
      <EmptyState
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-4 w-full">
        <Button
          variant={"secondary"}
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <BanIcon />
          Cancel meeting
        </Button>
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
