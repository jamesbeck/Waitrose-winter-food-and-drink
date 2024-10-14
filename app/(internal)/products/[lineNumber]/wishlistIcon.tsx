'use client';

import { HeartEmptyIcon } from '@/components/icons/heartEmptyIcon';
import { HeartFullIcon } from '@/components/icons/heartFullIcon';
import type { ProductWithWishlisted } from '@/lib/data/products';
import React from 'react';
import { WishlistAddButton } from '../wishlistAddButton';
import { WishlistRemoveButton } from '../wishlistRemoveButton';
import { AddedToWishlistDialog } from './addedToWishlistDialog';

type Props = {
  product: ProductWithWishlisted;
};

export const WishlistIcon: React.FC<Props> = ({ product }: Props) => {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      {product.is_wishlisted ? (
        <WishlistRemoveButton
          size="icon"
          className="absolute top-6 right-6 z-10"
          variant="ghost"
          product={product}
          label={<HeartFullIcon className="size-7" />}
        />
      ) : (
        <WishlistAddButton
          size="icon"
          className="absolute top-6 right-6 z-10"
          variant="ghost"
          product={product}
          label={<HeartEmptyIcon className="size-7" />}
          onChange={() => setShowDialog(true)}
        />
      )}
      <AddedToWishlistDialog show={showDialog} onChange={setShowDialog} />
    </>
  );
};
