import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DialogProps } from "@radix-ui/react-dialog";
import Link from "next/link";
import React from "react";

type Props = DialogProps;

export const LogInDialog: React.FC<Props> = (props: Props) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>We&apos;ve sent you an email</DialogTitle>

          <DialogDescription>
            Please check for an email from us (don&apos;t forget to check you
            spam folder), and tap the button to verify and log straight in!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {/* <Button asChild>
            <Link href="mailto:">Open mail app</Link>
          </Button> */}

          <Button onClick={() => props.onOpenChange?.(false)}>Return</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
