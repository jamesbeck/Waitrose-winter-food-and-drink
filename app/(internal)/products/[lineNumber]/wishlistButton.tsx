'use client';

import type { ProductWithWishlisted } from '@/lib/data/products';
import React from 'react';
import { WishlistAddButton } from '../wishlistAddButton';
import { WishlistRemoveButton } from '../wishlistRemoveButton';
import { AddedToWishlistDialog } from './addedToWishlistDialog';

type Props = {
  product: ProductWithWishlisted;
};

export const WishlistButton: React.FC<Props> = ({ product }: Props) => {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      {product.is_wishlisted ? (
        <WishlistRemoveButton product={product} />
      ) : (
        <WishlistAddButton
          product={product}
          onChange={() => setShowDialog(true)}
        />
      )}
      <AddedToWishlistDialog show={showDialog} onChange={setShowDialog} />
    </>
  );
};
