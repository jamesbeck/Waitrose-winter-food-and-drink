'use server';

import type { Event } from 'knex/types/tables';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '../knex';
import type { EventWithScheduled } from './events';
import { getCurrentUser } from './user';

export const getSchedule = async (
  offset = 0
): Promise<{ count: number; items: EventWithScheduled[] }> => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const [count, items] = await Promise.all([
    db
      .count<{ count: string }[]>('*')
      .from('schedule')
      .where('user_id', user.id)
      .first(),
    db
      .select<EventWithScheduled[]>([
        'events.*',
        db.raw('true as "is_scheduled"'),
      ])
      .from('schedule')
      .leftJoin('events', 'events.id', '=', 'schedule.event_id')
      .where('schedule.user_id', user.id)
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
