import type { Event } from 'knex/types/tables';
import React from 'react';

type Props = {
  type: Event['type'];
};

export const EventTypeIndicator: React.FC<Props> = ({ type }: Props) => {
  switch (type) {
    case 'DROP IN':
      return (
        <div className="rounded-full bg-green-500 border border-white size-3 inline-block" />
      );
    case 'PRE BOOK':
      return (
        <div className="rounded-full bg-red-500 border border-white size-3 inline-block" />
      );
    case 'SIGN UP':
      return (
        <div className="rounded-full bg-orange-500 border border-white size-3 inline-block" />
      );
    default:
      return null;
  }
};
