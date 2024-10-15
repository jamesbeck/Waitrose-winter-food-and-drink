'use client';

import { EmptyMessage } from '@/components/content/emptyMessage';
import { DataContainer } from '@/components/layout/dataContainer';
import { type EventWithScheduled } from '@/lib/data/events';
import { getSchedule } from '@/lib/data/schedule';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EventCard } from '../../../components/content/eventCard';
import { EventsGridSkeleton } from '../../../components/content/eventsGridSkeleton';

type Props = {
  events: EventWithScheduled[];
  count: number;
};

export const ScheduleGrid: React.FC<Props> = ({
  events: initialEvents,
  count,
}: Props) => {
  const [events, setEvents] = React.useState(initialEvents);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const loadEvents = async () => {
    const next = await getSchedule({ offset: events.length });

    setEvents((existing) => [...existing, ...next.items]);
  };

  const handleEventChange = (event: EventWithScheduled) => {
    setEvents((existing) =>
      existing.map((changed) => (changed.id === event.id ? event : changed))
    );
  };

  if (count === 0) {
    return (
      <DataContainer className="grow p-12 content-center">
        <EmptyMessage
          heading="You have no items in your schedule"
          message="To add items, please head over to the what’s on section and browse the available events"
        />
      </DataContainer>
    );
  }

  return (
    <DataContainer>
      <InfiniteScroll
        dataLength={events.length}
        next={loadEvents}
        hasMore={events.length < count}
        loader={<EventsGridSkeleton />}
      >
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onChange={handleEventChange}
            />
          ))}
        </div>
      </InfiniteScroll>
    </DataContainer>
  );
};
