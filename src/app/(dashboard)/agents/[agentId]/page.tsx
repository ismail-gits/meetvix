import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  AgentIdView,
  AgentsIdViewError,
  AgentsIdViewLoading,
} from "@/modules/agents/ui/views/agent-id-view";

interface AgentIdPageProps {
  params: Promise<{ agentId: string }>;
}

const AgentIdPage = async ({ params }: AgentIdPageProps) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AgentsIdViewError />}>
        <Suspense fallback={<AgentsIdViewLoading />}>
          <AgentIdView agentId={agentId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default AgentIdPage;
