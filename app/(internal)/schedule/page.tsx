import { EmptyMessage } from '@/components/content/emptyMessage';
import { Content } from '@/components/layout/content';
import { DataContainer } from '@/components/layout/dataContainer';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { getSchedule } from '@/lib/data/schedule';

export default async function Schedule() {
  const schedule = await getSchedule();

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

      {schedule.count === 0 && (
        <DataContainer className="grow p-12 content-center">
          <EmptyMessage
            heading="You have no items in your schedule"
            message="To add items, please head over to the what’s on section and browse the available events"
          />
        </DataContainer>
      )}
    </>
  );
}
