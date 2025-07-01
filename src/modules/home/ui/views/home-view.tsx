"use client";

import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const { data: session, error } = authClient.useSession();
  const router = useRouter();

  if (error) {
    return <div>Error loading session, please try again.</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  const onSignout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name || session.user.email || "User"}</p>
      <Button onClick={onSignout}>Sign out</Button>
    </div>
  );
};
