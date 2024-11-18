import { ScheduleButton } from '@/components/buttons/scheduleButton';
import { CalendarIcon } from '@/components/icons/calendarIcon';
import { ClockIcon } from '@/components/icons/clockIcon';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { H2 } from '@/components/typography/h2';
import { getEvent, getEventProducts } from '@/lib/data/events';
import { notFound } from 'next/navigation';
import { BackButton } from '../../products/[lineNumber]/backButton';
import { EventProductsGrid } from './eventProductsGrid';
import { EventTypeIndicator } from './eventTypeIndicator';
import { getEventDate } from './helpers';

type Props = {
  params: {
    id: string;
  };
};

export default async function Event({ params: { id } }: Props) {
  const event = await getEvent(id);
  const eventProducts = await getEventProducts(id);

  if (!event) {
    return notFound();
  }

  const date = getEventDate(event.day);

  const dateString = date
    ? `${date.getDate()}/${date.getMonth() + 1}/${`${date.getFullYear()}`.slice(
        -2
      )}`
    : '';

  return (
    <>
      <div className="relative p-6 -ml-3">
        <BackButton />
      </div>

      <Content className="relative text-left">
        <H1 className="text-left">
          {event.name} <EventTypeIndicator type={event.type} />
        </H1>

        <div className="space-y-1">
          <div className="flex space-x-3">
            {dateString && (
              <div className="flex space-x-1 items-center">
                <CalendarIcon className="mr-1 size-4 -mt-0.5 fill-black" />
                <div>{dateString}</div>
              </div>
            )}
            <div className="flex space-x-1 items-center">
              <ClockIcon className="size-4 -mt-0.5 fill-black" />
              <div>
                {event.start_time} - {event.end_time}
              </div>
            </div>
          </div>

          <div>
            {(event.room || event.floor) && (
              <p className="">
                {event.room}
                {event.floor ? ` - ${event.floor} Floor` : ''}
              </p>
            )}
          </div>
        </div>

        <div>
          {event.description && (
            <p className="font-light pb-3">{event.description}</p>
          )}
        </div>

        <div>
          <ScheduleButton event={event} />
        </div>

        <div>
          {eventProducts.count > 0 && (
            <div className="space-y-3">
              <H2>Featured Products</H2>

              <EventProductsGrid
                id={event.id}
                products={eventProducts.items}
                count={eventProducts.count}
              />
            </div>
          )}
        </div>
      </Content>
    </>
  );
}
