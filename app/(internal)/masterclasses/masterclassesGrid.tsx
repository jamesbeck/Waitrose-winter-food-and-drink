'use client';

import { EmptyMessage } from '@/components/content/emptyMessage';
import { DataContainer } from '@/components/layout/dataContainer';
import { getMasterclasses, type EventWithScheduled } from '@/lib/data/events';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { EventsGridSkeleton } from '../../../components/content/eventsGridSkeleton';
import { MasterclassCard } from '../../../components/content/masterclassCard';

type Props = {
  masterclasses: EventWithScheduled[];
  count: number;
};

export const MasterclassesGrid: React.FC<Props> = ({
  masterclasses: initialMasterclasses,
  count,
}: Props) => {
  const [masterclasses, setMasterclasses] =
    React.useState(initialMasterclasses);

  useEffect(() => {
    setMasterclasses(initialMasterclasses);
  }, [initialMasterclasses]);

  const loadEvents = async () => {
    const next = await getMasterclasses({ offset: masterclasses.length });

    setMasterclasses((existing) => [...existing, ...next.items]);
  };

  const handleMasterclassChange = (event: EventWithScheduled) => {
    setMasterclasses((existing) =>
      existing.map((changed) => (changed.id === event.id ? event : changed))
    );
  };

  if (count === 0) {
    return (
      <DataContainer className="grow p-12 content-center">
        <EmptyMessage
          heading="No masterclasses found"
          message="Try filtering by a different date."
        />
      </DataContainer>
    );
  }

  return (
    <DataContainer>
      <InfiniteScroll
        dataLength={masterclasses.length}
        next={loadEvents}
        hasMore={masterclasses.length < count}
        loader={<EventsGridSkeleton />}
      >
        <div className="grid grid-cols-1 gap-6">
          {masterclasses.map((masterclass) => (
            <MasterclassCard
              key={masterclass.id}
              masterclass={masterclass}
              onChange={handleMasterclassChange}
            />
          ))}
        </div>
      </InfiniteScroll>
    </DataContainer>
  );
};
