'use client';

import type { ProductWithWishlisted } from '@/lib/data/products';
import React from 'react';
import { AddedToWishlistDialog } from '../dialogs/addedToWishlistDialog';
import type { ButtonProps } from '../ui/button';
import { WishlistAddButton } from './wishlist/wishlistAddButton';
import { WishlistRemoveButton } from './wishlist/wishlistRemoveButton';

type Props = Omit<ButtonProps, 'onChange'> & {
  onChange?: (product: ProductWithWishlisted) => void;
  product: ProductWithWishlisted;
};

export const WishlistButton: React.FC<Props> = ({
  product,
  onChange,
  ...props
}: Props) => {
  const [showAddedDialog, setShowAddedDialog] = React.useState(false);

  return (
    <>
      {product.is_wishlisted ? (
        <WishlistRemoveButton
          product={product}
          onChange={onChange}
          {...props}
        />
      ) : (
        <WishlistAddButton
          product={product}
          onChange={() => {
            setShowAddedDialog(true);
            onChange?.(product);
          }}
          {...props}
        />
      )}
      <AddedToWishlistDialog
        show={showAddedDialog}
        onChange={setShowAddedDialog}
      />
    </>
  );
};
