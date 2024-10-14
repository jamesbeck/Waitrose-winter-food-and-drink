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

export const AddedToWishlistDialog: React.FC<Props> = ({
  show,
  onChange,
}: Props) => {
  return (
    <Dialog open={show} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal text-xl">
            Product added to your wishlist!
          </DialogTitle>

          <DialogDescription className="font-light text-base">
            You can now navigate to your wishlist for easier access to scan your
            favourite items
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button asChild>
            <a href="/wishlist">Go to wishlist</a>
          </Button>

          <Button variant="outline" onClick={() => onChange(false)}>
            Return
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
