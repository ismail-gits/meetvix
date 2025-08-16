import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@/lib/auth";

import {
  UpgradeView,
  UpgradeViewError,
  UpgradeViewLoading,
} from "@/modules/premium/ui/views/upgrade-view";

const UpgradePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );
  void queryClient.prefetchQuery(trpc.premium.getProducts.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<UpgradeViewError />}>
        <Suspense fallback={<UpgradeViewLoading />}>
          <UpgradeView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default UpgradePage;
