import { useRouter } from "next/navigation";

import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GeneratedAvatar } from "@/components/generated-avatar";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();
  const router = useRouter();

  const onSignout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          asChild
          className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden cursor-pointer"
        >
          <button>
            {data.user.image ? (
              <Avatar className="mr-3">
                <AvatarImage src={data.user.image} alt="Avatar" />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={data.user.name}
                variant="initials"
                className="size-9 mr-3"
              />
            )}
            <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
              <p className="text-sm truncate w-full">{data.user.name}</p>
              <p className="text-xs truncate w-full">{data.user.email}</p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={() => authClient.customer.portal()}
              variant={"outline"}
              className="flex items-center"
            >
              <CreditCardIcon className="size-4" />
              Billing
            </Button>
            <Button
              onClick={onSignout}
              variant={"outline"}
              className="flex items-center"
            >
              <LogOutIcon className="size-4" />
              Sign out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden cursor-pointer">
        {data.user.image ? (
          <Avatar className="mr-3">
            <AvatarImage src={data.user.image} alt="Avatar" />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => authClient.customer.portal()}
          className="cursor-pointer flex items-center justify-between"
        >
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onSignout}
          className="cursor-pointer flex items-center justify-between"
        >
          Sign out
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
