import { OctagonAlert } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

interface AuthAlertProps {
  error: string | null;
}

export const AuthAlert = ({ error }: AuthAlertProps) => {
  return (
    <Alert className="bg-destructive/10 border-none">
      <OctagonAlert className="size-4 !text-destructive" />
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  );
};
