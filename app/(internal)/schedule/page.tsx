import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { getSchedule } from '@/lib/data/schedule';
import { ScheduleGrid } from './scheduleGrid';

export default async function Schedule() {
  const schedule = await getSchedule({});

  return (
    <>
      <Content>
        <H1>My Schedule</H1>

        <Lead>
          View everything planned for the festival here.
          <br />
          Filter and Sort the events to find what you&apos;ll love!
        </Lead>
      </Content>

      <ScheduleGrid events={schedule.items} count={schedule.count} />
    </>
  );
}
