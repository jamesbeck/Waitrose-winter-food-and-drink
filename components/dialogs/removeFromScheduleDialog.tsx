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
  onConfirm: () => void;
};

export const RemoveFromScheduleDialog: React.FC<Props> = ({
  show,
  onChange,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={show} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove event</DialogTitle>

          <DialogDescription>
            Are you sure you want to remove this item from your schedule?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button onClick={() => onConfirm()}>Remove from schedule</Button>

          <Button variant="outline" onClick={() => onChange(false)}>
            No, Return
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
