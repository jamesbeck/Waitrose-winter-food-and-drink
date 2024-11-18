import type { EventWithScheduled } from '@/lib/data/events';

export const getEventDate = (day: EventWithScheduled['day']) => {
  switch (day) {
    case 'Friday':
      return new Date('2024-11-22');
    case 'Saturday':
      return new Date('2024-11-23');
    case 'Sunday':
      return new Date('2024-11-24');
    default:
      return undefined;
  }
};
