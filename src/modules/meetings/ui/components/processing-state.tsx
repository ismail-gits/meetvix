import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <div className="bg-white rounde-lg px-4 py-5 flex items-center justify-center flex-col gap-y-8">
      <EmptyState
        title="Meeting completed"
        description="This meeting was completed, a summary will appear soon"
        image="/processing.svg"
      />
    </div>
  );
};
