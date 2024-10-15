'use server';

import type { Event } from 'knex/types/tables';
import { db } from '../knex';

export type EventWithScheduled = Event;

type EventList = {
  count: number;
  items: EventWithScheduled[];
};

export type FilterDay = 'Friday' | 'Saturday' | 'Sunday';

export const isFilterDay = (value: string): value is FilterDay =>
  ['Friday', 'Saturday', 'Sunday'].includes(value);

type Params = {
  offset?: number;
  days?: FilterDay[];
};

export const getStandardEvents = async ({
  offset = 0,
  days,
}: Params): Promise<EventList> => {
  const baseQuery = db.from('events').where('type', 'standard');

  if (days && days.length > 0) {
    baseQuery.whereIn('day', days);
  }

  const [count, items] = await Promise.all([
    baseQuery.clone().count<{ count: string }[]>('*').first(),
    baseQuery
      .clone()
      .select<EventWithScheduled[]>(['events.*'])
      .orderBy('id', 'asc')
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count ? parseInt(count.count) : 0, items };
};
