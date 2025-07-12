import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";

import {
  MeetingsView,
  MeetingsViewError,
  MeetingsViewLoading,
} from "./ui/views/meetings-view";

const MeetingsPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<MeetingsViewError />}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <MeetingsView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default MeetingsPage;
