'use client';

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

  return (
    <div className="bg-subtle-background px-6 py-3">
      {count === 0 ? (
        <p className="text-center text-gray-500">
          No events found. Try filtering by a different date.
        </p>
      ) : (
        <InfiniteScroll
          dataLength={events.length}
          next={loadEvents}
          hasMore={events.length < count}
          loader={<EventsGridSkeleton />}
        >
          <div className="grid grid-cols-1 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};
