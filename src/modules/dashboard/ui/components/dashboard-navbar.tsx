"use client";

import { useEffect, useState } from "react";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

import { DashboardCommand } from "./dashboard-command";

export const DashboardNavbar = () => {
  const [isMac, setIsMac] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { state, toggleSidebar, isMobile } = useSidebar();

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isMacOs = /Mac|iPhone|iPad|iPod/.test(userAgent);

    setIsMac(isMacOs);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] flex justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant={"outline"}
          size={"sm"}
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            {isMac ? <span>&#8984;</span> : "Ctrl"} + K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
