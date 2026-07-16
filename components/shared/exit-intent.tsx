"use client";

import * as React from "react";
import Link from "next/link";
import { Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/** Exit-intent lead-capture modal — fires once per session. */
export function ExitIntent() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mm_exit_shown")) return;

    const trigger = () => {
      if (sessionStorage.getItem("mm_exit_shown")) return;
      sessionStorage.setItem("mm_exit_shown", "1");
      setOpen(true);
    };

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseout", onLeave);

    // Mobile fallback: fire after a generous dwell time.
    const timer = setTimeout(trigger, 35000);

    return () => {
      document.removeEventListener("mouseout", onLeave);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md text-center">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary/10 text-primary-dark">
          <Gift className="size-8" />
        </div>
        <DialogTitle className="text-center text-3xl">Wait — before you go</DialogTitle>
        <DialogDescription className="mx-auto mt-2 max-w-sm text-center text-base">
          Book this month and receive a{" "}
          <span className="font-semibold text-accent">complimentary décor upgrade</span>{" "}
          plus a free design consultation with our creative director.
        </DialogDescription>
        <div className="mt-6 flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <Link href="/book" onClick={() => setOpen(false)}>
              Claim My Free Consultation
            </Link>
          </Button>
          <button
            onClick={() => setOpen(false)}
            className="text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            No thanks, maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
