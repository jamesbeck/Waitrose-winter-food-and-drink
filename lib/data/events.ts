'use server';

import type { Event } from 'knex/types/tables';
import { db } from '../knex';

export type EventWithScheduled = Event;

type EventList = {
  count: number;
  items: EventWithScheduled[];
};

type Params = {
  offset?: number;
};

export const getStandardEvents = async ({
  offset = 0,
}: Params): Promise<EventList> => {
  const baseQuery = db.from('events').where('type', 'standard');

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
