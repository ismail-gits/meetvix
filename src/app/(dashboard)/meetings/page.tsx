import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import type { SearchParams } from "nuqs";

import { auth } from "@/lib/auth";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import {
  MeetingsView,
  MeetingsViewError,
  MeetingsViewLoading,
} from "@/modules/meetings/ui/views/meetings-view";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header";
import { loadSearchParams } from "@/modules/meetings/params";

interface MeetingsPageprops {
  searchParams: Promise<SearchParams>;
}

const MeetingsPage = async ({ searchParams }: MeetingsPageprops) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<MeetingsViewError />}>
          <Suspense fallback={<MeetingsViewLoading />}>
            <MeetingsView />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
};

export default MeetingsPage;
