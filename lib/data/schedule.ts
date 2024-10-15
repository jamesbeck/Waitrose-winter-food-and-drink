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
