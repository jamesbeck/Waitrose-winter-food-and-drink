import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import {
  getStandardEvents,
  isFilterDay,
  type FilterDay,
} from '@/lib/data/events';
import { EventFiltersDrawer } from '../../../components/drawers/eventFiltersDrawer';
import { EventsGrid } from './eventsGrid';
import { EventTypeKey } from './eventTypeKey';

type Props = {
  searchParams: {
    days?: string;
  };
};

export default async function WhatsOn({ searchParams: { days } }: Props) {
  const daysFilter: FilterDay[] = days
    ? days.split(',').filter(isFilterDay)
    : ['Friday', 'Saturday', 'Sunday'];

  const events = await getStandardEvents({ offset: 0, days: daysFilter });

  return (
    <>
      <Content className="pb-0">
        <H1>What&apos;s On</H1>

        <Lead>
          View everything planned for the festival here.
          <br />
          Filter and sort the events to find what you&apos;ll love!
        </Lead>

        <EventTypeKey />

        <EventFiltersDrawer days={daysFilter} />
      </Content>

      <EventsGrid
        events={events.items}
        count={events.count}
        days={daysFilter}
      />
    </>
  );
}
