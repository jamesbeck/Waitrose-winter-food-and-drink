import React from 'react';
import { EventCardSkeleton } from './eventCardSkeleton';

type Props = {};

export const EventsGridSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <div className="py-6 grid grid-cols-1 gap-6">
      <EventCardSkeleton />
    </div>
  );
};
