"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useConfirm } from "@/hooks/use-confirm";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../components/completed-state";

interface MeetingIdViewProps {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );

        toast.success("Meeting deleted");
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm({
    title: "Are you sure?",
    description: "The following action will remove this meeting",
  });

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) {
      return;
    }

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isUpcoming = data.status === "upcoming";
  const isActive = data.status === "active";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  const isCancelled = data.status === "cancelled";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCompleted && <CompletedState data={data} />}
        {isProcessing && <ProcessingState />}
        {isCancelled && <CancelledState />}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading meeting"
      description="This may take a few seconds..."
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Failed to load meeting"
      description="Something went wrong"
    />
  );
};
