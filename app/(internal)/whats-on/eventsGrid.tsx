'use client';

import { EmptyMessage } from '@/components/content/emptyMessage';
import { DataContainer } from '@/components/layout/dataContainer';
import { getStandardEvents, type EventWithScheduled } from '@/lib/data/events';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EventCard } from './eventCard';
import { EventsGridSkeleton } from './eventsGridSkeleton';

type Props = {
  events: EventWithScheduled[];
  count: number;
};

export const EventsGrid: React.FC<Props> = ({
  events: initialEvents,
  count,
}: Props) => {
  const [events, setEvents] = React.useState(initialEvents);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const loadEvents = async () => {
    const next = await getStandardEvents({ offset: events.length });

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
          heading="No events found"
          message="Try filtering by a different date."
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
