'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import type { EventWithScheduled } from '@/lib/data/events';
import { removeEventFromSchedule } from '@/lib/data/schedule';
import React from 'react';

type Props = Omit<ButtonProps, 'onChange'> & {
  event: EventWithScheduled;
  onChange?: (event: EventWithScheduled) => void;
  label?: string | React.ReactNode;
};

export const ScheduleRemoveButton: React.FC<Props> = ({
  event,
  onChange,
  label = 'Remove from schedule',
  ...props
}: Props) => {
  const handleRemove = async () => {
    await removeEventFromSchedule(event.id);

    onChange?.({ ...event, is_scheduled: false });
  };

  return (
    <Button variant="outline" onClick={handleRemove} {...props}>
      {label}
    </Button>
  );
};
