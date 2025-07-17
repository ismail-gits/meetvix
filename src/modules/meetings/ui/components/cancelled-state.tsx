import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  return (
    <div className="bg-white rounde-lg px-4 py-5 flex items-center justify-center flex-col gap-y-8">
      <EmptyState
        title="Meeting cancelled"
        description="This meeting was cancelled"
        image="/cancelled.svg"
      />
    </div>
  );
};
