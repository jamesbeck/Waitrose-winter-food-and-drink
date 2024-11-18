import { getEventDate } from '@/app/(internal)/events/[id]/helpers';
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
import { type EventWithScheduled } from '@/lib/data/events';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type Props = {
  masterclass: EventWithScheduled;
  onChange?: (event: EventWithScheduled) => void;
};

const bgColourMappings: Record<EventWithScheduled['day'], string> = {
  Friday: 'bg-waitrose-red',
  Saturday: 'bg-waitrose-brown',
  Sunday: 'bg-waitrose-lime',
};

const textColourMappings: Record<EventWithScheduled['day'], string> = {
  Friday: 'text-waitrose-lime',
  Saturday: 'text-waitrose-red',
  Sunday: 'text-waitrose-red',
};

const iconColourMappings: Record<EventWithScheduled['day'], string> = {
  Friday: 'fill-waitrose-lime',
  Saturday: 'fill-waitrose-red',
  Sunday: 'fill-waitrose-red',
};

export const MasterclassCard: React.FC<Props> = ({
  masterclass,
  onChange,
}: Props) => {
  const date = getEventDate(masterclass.day);
  const bgColour = bgColourMappings[masterclass.day] || 'bg-waitrose-brown';
  const textColour = textColourMappings[masterclass.day] || 'text-waitrose-red';
  const iconColour = iconColourMappings[masterclass.day] || 'fill-waitrose-red';

  const dateString = date
    ? `${date.getDate()}/${date.getMonth() + 1}/${`${date.getFullYear()}`.slice(
        -2
      )}`
    : '';

  return (
    <Card className="rounded-3xl">
      <Link href={`/events/${masterclass.id}`}>
        <CardHeader
          className={cn(
            'h-22 p-3 flex flex-col justify-end space-y-3 rounded-t-3xl text-white',
            bgColour,
            textColour
          )}
        >
          <CardTitle>{masterclass.name}</CardTitle>

          <CardDescription className="hidden">
            {dateString} {masterclass.start_time} - {masterclass.end_time}
          </CardDescription>

          <div className="flex space-x-3 text-white">
            {date && (
              <div className="flex space-x-1 items-center">
                <CalendarIcon
                  className={cn('mr-1 size-4 -mt-0.5', iconColour)}
                />
                <div>{dateString}</div>
              </div>
            )}
            <div className="flex space-x-1 items-center">
              <ClockIcon className={cn('size-4 -mt-0.5', iconColour)} />
              <div>
                {masterclass.start_time} - {masterclass.end_time}
              </div>
            </div>
          </div>
        </CardHeader>
      </Link>

      <CardContent className="pt-3">
        {masterclass.description && (
          <p className="font-light pb-3">{masterclass.description}</p>
        )}

        <ScheduleButton event={masterclass} onChange={onChange} />
      </CardContent>
    </Card>
  );
};
