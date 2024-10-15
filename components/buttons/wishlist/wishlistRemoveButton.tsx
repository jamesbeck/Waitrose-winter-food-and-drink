'use client';

import { RemoveFromWishlistDialog } from '@/components/dialogs/removeFromWishlistDialog';
import { Button, type ButtonProps } from '@/components/ui/button';
import type { ProductWithWishlisted } from '@/lib/data/products';
import { removeProductFromWishlist } from '@/lib/data/wishlist';
import React from 'react';

type Props = Omit<ButtonProps, 'onChange'> & {
  product: ProductWithWishlisted;
  onChange?: (product: ProductWithWishlisted) => void;
  label?: string | React.ReactNode;
};

export const WishlistRemoveButton: React.FC<Props> = ({
  product,
  onChange,
  label = 'Remove from wishlist',
  ...props
}: Props) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleRemove = async () => {
    const success = await removeProductFromWishlist(product.line_number);

    if (!success) {
      return;
    }

    onChange?.({ ...product, is_wishlisted: false });
  };

  return (
    <>
      <Button onClick={() => setShowDialog(true)} {...props}>
        {label}
      </Button>
      <RemoveFromWishlistDialog
        show={showDialog}
        onChange={setShowDialog}
        onConfirm={handleRemove}
      />
    </>
  );
};
