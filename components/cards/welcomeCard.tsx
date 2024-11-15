"use client";

import { markWelcomed } from "@/lib/auth";
import React from "react";
import { HamburgerIcon } from "../icons/hamburgerIcon";
import { QrCodeIcon } from "../icons/qrCodeIcon";
import { UserIcon } from "../icons/userIcon";
import { Lead } from "../typography/lead";
import { Small } from "../typography/small";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {};

export const WelcomeCard: React.FC<Props> = () => {
  const handleDismiss = () => {
    markWelcomed();
  };

  return (
    <Card>
      <CardHeader className="w-3/4 mx-auto">
        <CardTitle className="text-center text-xl">
          Welcome to Waitrose Food and Drink Festival
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex space-x-3 items-start">
          <Lead>
            Use the menu in the top left corner to explore the interactive
            festival.
          </Lead>
          <HamburgerIcon className="size-10" />
        </div>

        <Lead>
          Explore upcoming events and masterclasses and create your own schedule
          or wishlist.
        </Lead>

        <div className="flex space-x-3 items-start">
          <Lead>View your profile and log-out in the top right corner</Lead>
          <UserIcon className="size-10" />
        </div>

        <div className="flex space-x-3 items-start">
          <QrCodeIcon className="size-10" />
          <Lead>
            Tap this button to scan QR codes around the festival with your
            camera.
          </Lead>
        </div>

        <div>
          <Small>
            &lsquo;Camera permissions&rsquo; must be allowed, go to settings
          </Small>
        </div>

        <Button variant="outline" onClick={() => handleDismiss()}>
          Dismiss guide
        </Button>
      </CardContent>
    </Card>
  );
};
