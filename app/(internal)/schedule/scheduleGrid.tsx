'use client';

import { EmptyMessage } from '@/components/content/emptyMessage';
import { DataContainer } from '@/components/layout/dataContainer';
import { type EventWithScheduled, type FilterDay } from '@/lib/data/events';
import { getSchedule } from '@/lib/data/schedule';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EventCard } from '../../../components/content/eventCard';
import { EventsGridSkeleton } from '../../../components/content/eventsGridSkeleton';
import { MasterclassCard } from '../../../components/content/masterclassCard';

type Props = {
  events: EventWithScheduled[];
  count: number;
  days: FilterDay[];
};

export const ScheduleGrid: React.FC<Props> = ({
  events: initialEvents,
  count,
  days,
}: Props) => {
  const [events, setEvents] = React.useState(initialEvents);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const loadEvents = async () => {
    const next = await getSchedule({ offset: events.length, days });

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
          {events.map((event) =>
            event.type === 'masterclass' ? (
              <MasterclassCard
                key={event.id}
                masterclass={event}
                onChange={handleEventChange}
              />
            ) : (
              <EventCard
                key={event.id}
                event={event}
                onChange={handleEventChange}
              />
            )
          )}
        </div>
      </InfiniteScroll>
    </DataContainer>
  );
};
