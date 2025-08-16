import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";

interface UpcomingStateProps {
  meetingId: string;
}

export const UpcomingState = ({
  meetingId,
}: UpcomingStateProps) => {
  return (
    <div className="bg-white rounde-lg px-4 py-5 flex items-center justify-center flex-col gap-y-8">
      <EmptyState
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-4 w-full">
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
