import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';

type Props = {
  show: boolean;
  onChange: (show: boolean) => void;
};

export const AddedToScheduleDialog: React.FC<Props> = ({
  show,
  onChange,
}: Props) => {
  return (
    <Dialog open={show} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Event add to schedule!</DialogTitle>

          <DialogDescription>
            Your event has been successfully added to your schedule. Stay
            organised and on time by managing your events and masterclasses
            within the <strong>My Schedule</strong> area of the app
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button asChild>
            <a href="/schedule">My Schedule</a>
          </Button>

          <Button variant="outline" onClick={() => onChange(false)}>
            Return
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
