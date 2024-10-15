'use client';

import { BackIcon } from '@/components/icons/backIcon';
import { FilterIcon } from '@/components/icons/filterIcon';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import type { FilterDay } from '@/lib/data/events';
import React from 'react';
import { FiltersForm } from './filtersForm';

type Props = {
  days: FilterDay[];
};

export const FiltersDrawer: React.FC<Props> = ({ days }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Drawer direction="left" open={open} onOpenChange={setOpen} modal={false}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start border-b border-subtle-foreground rounded-none text-base"
          >
            Filter <FilterIcon className="ml-3" />
          </Button>
        </DrawerTrigger>

        <DrawerContent
          overlay={false}
          className="p-6 left-0 space-y-12 top-20 bottom-0 mt-0 rounded-none border-none w-full overflow-y-auto overflow-x-hidden"
        >
          <DialogHeader className="relative">
            <Button
              variant="ghost"
              className="absolute left-0 top-1.5 w-fit h-fit p-0"
              onClick={() => setOpen(false)}
            >
              <BackIcon />
            </Button>

            <div>
              <DialogTitle>Filter and sort</DialogTitle>

              <DialogDescription className="hidden">
                Filter what&apos;s on
              </DialogDescription>
            </div>
          </DialogHeader>

          <FiltersForm days={days} onSubmitted={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    </>
  );
};
