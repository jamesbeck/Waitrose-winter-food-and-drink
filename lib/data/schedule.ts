'use server';

import type { Event } from 'knex/types/tables';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '../knex';
import type { EventWithScheduled, FilterDay } from './events';
import { getCurrentUser } from './user';

type Params = {
  offset?: number;
  days?: FilterDay[];
};

export const getSchedule = async ({
  offset = 0,
  days,
}: Params): Promise<{ count: number; items: EventWithScheduled[] }> => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const baseQuery = db
    .from('schedule')
    .where('schedule.user_id', user.id)
    .leftJoin('events', 'events.id', '=', 'schedule.event_id');

  if (days && days.length > 0) {
    baseQuery.whereIn('events.day', days);
  }

  const [count, items] = await Promise.all([
    baseQuery.clone().count<{ count: string }[]>('*').first(),
    baseQuery
      .clone()
      .select<EventWithScheduled[]>([
        'events.*',
        db.raw('true as "is_scheduled"'),
      ])
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count ? parseInt(count.count) : 0, items };
};

export const addEventToSchedule = async (id: Event['id']) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  await db.table('schedule').insert({ user_id: user.id, event_id: id });

  revalidatePath('/schedule');
};

export const removeEventFromSchedule = async (id: Event['id']) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  await db.table('schedule').where({ user_id: user.id, event_id: id }).delete();

  revalidatePath('/schedule');
};
