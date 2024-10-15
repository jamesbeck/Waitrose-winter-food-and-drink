'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import type { EventWithScheduled } from '@/lib/data/events';
import { addEventToSchedule } from '@/lib/data/schedule';
import React from 'react';

type Props = Omit<ButtonProps, 'onChange'> & {
  event: EventWithScheduled;
  onChange?: (event: EventWithScheduled) => void;
  label?: string | React.ReactNode;
};

export const ScheduleAddButton: React.FC<Props> = ({
  event,
  onChange,
  label = 'Add to schedule',
  ...props
}: Props) => {
  const handleAdd = async () => {
    await addEventToSchedule(event.id);

    onChange?.({ ...event, is_scheduled: true });
  };

  return (
    <Button variant="outline" onClick={handleAdd} {...props}>
      {label}
    </Button>
  );
};
