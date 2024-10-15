'use client';

import type { EventWithScheduled } from '@/lib/data/events';
import React from 'react';
import { AddedToScheduleDialog } from '../dialogs/addedToScheduleDialog';
import type { ButtonProps } from '../ui/button';
import { ScheduleAddButton } from './schedule/scheduleAddButton';
import { ScheduleRemoveButton } from './schedule/scheduleRemoveButton';

type Props = Omit<ButtonProps, 'onChange'> & {
  onChange?: (event: EventWithScheduled) => void;
  event: EventWithScheduled;
};

export const ScheduleButton: React.FC<Props> = ({
  event,
  onChange,
  ...props
}: Props) => {
  const [showAddedDialog, setShowAddedDialog] = React.useState(false);

  return (
    <>
      {event.is_scheduled ? (
        <ScheduleRemoveButton event={event} onChange={onChange} {...props} />
      ) : (
        <ScheduleAddButton
          event={event}
          onChange={() => {
            setShowAddedDialog(true);
            onChange?.(event);
          }}
          {...props}
        />
      )}
      <AddedToScheduleDialog
        show={showAddedDialog}
        onChange={setShowAddedDialog}
      />
    </>
  );
};
