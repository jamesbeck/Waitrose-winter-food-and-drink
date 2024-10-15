import { ScheduleButton } from '@/components/buttons/scheduleButton';
import { CalendarIcon } from '@/components/icons/calendarIcon';
import { ClockIcon } from '@/components/icons/clockIcon';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { EventWithScheduled } from '@/lib/data/events';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  event: EventWithScheduled;
  onChange?: (event: EventWithScheduled) => void;
};

const dateMappings: Record<EventWithScheduled['day'], Date | undefined> = {
  Friday: new Date('2024-11-22'),
  Saturday: new Date('2024-11-23'),
  Sunday: new Date('2024-11-24'),
};

const colourMappings: Record<EventWithScheduled['day'], string> = {
  Friday: 'bg-waitrose-brown',
  Saturday: 'bg-waitrose-brown',
  Sunday: 'bg-waitrose-brown',
};

export const EventCard: React.FC<Props> = ({ event, onChange }: Props) => {
  const date = dateMappings[event.day];
  const colour = colourMappings[event.day] || 'bg-waitrose-brown';

  const dateString = date
    ? `${date.getDate()}/${date.getMonth() + 1}/${`${date.getFullYear()}`.slice(
        -2
      )}`
    : '';

  return (
    <Card className="rounded-3xl">
      <CardHeader
        className={cn(
          'h-40 p-3 flex flex-col justify-end space-y-6 rounded-t-3xl text-white',
          colour
        )}
      >
        <CardTitle className="text-lg font-normal">{event.name}</CardTitle>

        <CardDescription className="hidden">
          {dateString} {event.start_time} - {event.end_time}
        </CardDescription>

        <div className="flex space-x-3 text-white">
          {date && (
            <div className="flex space-x-1 items-center">
              <CalendarIcon className="mr-1 size-4 -mt-0.5" />
              <div>{dateString}</div>
            </div>
          )}
          <div className="flex space-x-1 items-center">
            <ClockIcon className="size-4 -mt-0.5" />
            <div>
              {event.start_time} - {event.end_time}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-3">
        <ScheduleButton event={event} onChange={onChange} />
      </CardContent>
    </Card>
  );
};
