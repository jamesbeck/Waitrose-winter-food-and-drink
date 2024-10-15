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

export const RemoveFromWishlistDialog: React.FC<Props> = ({
  show,
  onChange,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={show} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove product</DialogTitle>

          <DialogDescription>
            Are you sure you want to remove this product from your wishlist?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button onClick={() => onConfirm()}>Remove from wishlist</Button>

          <Button variant="outline" onClick={() => onChange(false)}>
            No, Return
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
