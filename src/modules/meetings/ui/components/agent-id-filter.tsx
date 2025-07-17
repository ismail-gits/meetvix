import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { UseMeetingsFilters } from "../../hooks/use-meetings-filters";

export const AgentIdFilter = () => {
  const [filters, setFilters] = UseMeetingsFilters();
  const [agentSearch, setAgentSearch] = useState("");

  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  return (
    <CommandSelect
      placeholder="Agent"
      className="h-9"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={agent.name}
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  );
};
