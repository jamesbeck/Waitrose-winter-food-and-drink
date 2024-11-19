import { EventTypeIndicator } from "@/app/(internal)/events/[id]/eventTypeIndicator";
import { getEventDate } from "@/app/(internal)/events/[id]/helpers";
import { ScheduleButton } from "@/components/buttons/scheduleButton";
import { CalendarIcon } from "@/components/icons/calendarIcon";
import { ClockIcon } from "@/components/icons/clockIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type EventWithScheduled } from "@/lib/data/events";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  event: EventWithScheduled;
  onChange?: (event: EventWithScheduled) => void;
};

const colourMappings: Record<EventWithScheduled["day"], string> = {
  "Always On": "bg-waitrose-brown",
  Friday: "bg-waitrose-brown",
  Saturday: "bg-waitrose-red",
  Sunday: "bg-waitrose-lime",
};

const textColourMappings: Record<EventWithScheduled["day"], string> = {
  "Always On": "bg-waitrose-red",
  Friday: "text-waitrose-red",
  Saturday: "text-waitrose-lime",
  Sunday: "text-waitrose-red",
};

const iconColourMappings: Record<EventWithScheduled["day"], string> = {
  "Always On": "fill-waitrose-red",
  Friday: "fill-waitrose-red",
  Saturday: "fill-waitrose-lime",
  Sunday: "fill-waitrose-red",
};

export const EventCard: React.FC<Props> = ({ event, onChange }: Props) => {
  const date = getEventDate(event.day);
  const bgColour = colourMappings[event.day] || "bg-waitrose-brown";
  const textColour = textColourMappings[event.day] || "text-waitrose-red";
  const iconColour = iconColourMappings[event.day] || "fill-waitrose-red";

  const dateString = date
    ? `${date.getDate()}/${date.getMonth() + 1}/${`${date.getFullYear()}`.slice(
        -2
      )}`
    : "";

  return (
    <Card className="rounded-3xl">
      <Link href={`/events/${event.id}`}>
        <CardHeader
          className={cn(
            "h-40 p-3 flex flex-col justify-end space-y-6 rounded-t-3xl text-white",
            bgColour,
            textColour
          )}
        >
          <CardTitle>
            {event.name} <EventTypeIndicator type={event.type} />
          </CardTitle>

          <CardDescription className="hidden">
            {dateString} {event.start_time} - {event.end_time}
          </CardDescription>

          <div className="space-y-1">
            <div className="flex space-x-3 text-white">
              {date && (
                <div className="flex space-x-1 items-center">
                  <CalendarIcon
                    className={cn("mr-1 size-4 -mt-0.5 fill-white", iconColour)}
                  />
                  <div>{dateString}</div>
                </div>
              )}
              {event.start_time && (
                <div className="flex space-x-1 items-center">
                  <ClockIcon
                    className={cn("size-4 -mt-0.5 fill-white", iconColour)}
                  />
                  <div>
                    {event.start_time}
                    {event.end_time ? ` - ${event.end_time}` : ""}
                  </div>
                </div>
              )}
              {event.day == "Always on" && (
                <div className="flex space-x-1 items-center">
                  <CalendarIcon
                    className={cn("mr-1 size-4 -mt-0.5 fill-white", iconColour)}
                  />
                  <ClockIcon
                    className={cn("size-4 -mt-0.5 fill-white", iconColour)}
                  />{" "}
                  <div>Always On</div>
                </div>
              )}
            </div>

            <div className="text-white">
              {(event.room || event.floor) && (
                <p className="">
                  {event.room}
                  {event.floor ? ` - ${event.floor} Floor` : ""}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Link>

      <CardContent className="pt-3">
        <ScheduleButton event={event} onChange={onChange} />
      </CardContent>
    </Card>
  );
};
