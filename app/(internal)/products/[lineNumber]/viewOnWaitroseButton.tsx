"use client";

import { BackIcon } from "@/components/icons/backIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type Props = { url: string };

export const ViewOnWaitroseButton: React.FC<Props> = (props: Props) => {
  return (
    <Button onClick={() => window.open(props.url, "_blank")}>
      View on Waitrose.com
    </Button>
  );
};
