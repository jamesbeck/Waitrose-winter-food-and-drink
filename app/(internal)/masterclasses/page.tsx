import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import {
  getMasterclasses,
  isFilterDay,
  type FilterDay,
} from '@/lib/data/events';
import { EventFiltersDrawer } from '../../../components/drawers/eventFiltersDrawer';
import { MasterclassesGrid } from './masterclassesGrid';

type Props = {
  searchParams: {
    days?: string;
  };
};

export default async function Masterclasses({ searchParams: { days } }: Props) {
  const daysFilter: FilterDay[] = days
    ? days.split(',').filter(isFilterDay)
    : ['Friday', 'Saturday', 'Sunday'];

  const masterclasses = await getMasterclasses({ offset: 0, days: daysFilter });

  return (
    <>
      <Content className="pb-0">
        <H1>Masterclasses</H1>

        <Lead>
          Here you&apos;ll see all of our famous masterclasses on each day of
          the festival. If you have purchased a ticket you can add this to your
          schedule
        </Lead>

        <EventFiltersDrawer days={daysFilter} />
      </Content>

      <MasterclassesGrid
        masterclasses={masterclasses.items}
        count={masterclasses.count}
      />
    </>
  );
}
