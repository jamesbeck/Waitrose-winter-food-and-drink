import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { getStandardEvents } from '@/lib/data/events';
import { EventsGrid } from './eventsGrid';

export default async function WhatsOn() {
  const events = await getStandardEvents({ offset: 0 });

  return (
    <>
      <Content>
        <H1>What&apos;s On</H1>

        <Lead>
          View everything planned for the festival here. Filter and Sort the
          events to find what you'll love!
        </Lead>
      </Content>

      <EventsGrid events={events.items} count={events.count} />
    </>
  );
}
