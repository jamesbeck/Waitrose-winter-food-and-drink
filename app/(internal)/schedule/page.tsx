import { EventFiltersDrawer } from '@/components/drawers/eventFiltersDrawer';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { isFilterDay, type FilterDay } from '@/lib/data/events';
import { getSchedule } from '@/lib/data/schedule';
import { ScheduleGrid } from './scheduleGrid';

type Props = {
  searchParams: {
    days?: string;
  };
};

export default async function Schedule({ searchParams: { days } }: Props) {
  const daysFilter: FilterDay[] = days
    ? days.split(',').filter(isFilterDay)
    : ['Friday', 'Saturday', 'Sunday'];

  const schedule = await getSchedule({ offset: 0, days: daysFilter });

  return (
    <>
      <Content className="pb-0">
        <H1>My Schedule</H1>

        <Lead>
          View everything planned for the festival here.
          <br />
          Filter and Sort the events to find what you&apos;ll love!
        </Lead>

        <EventFiltersDrawer days={daysFilter} />
      </Content>

      <ScheduleGrid
        events={schedule.items}
        count={schedule.count}
        days={daysFilter}
      />
    </>
  );
}
