'use client';

import { HeartEmptyIcon } from '@/components/icons/heartEmptyIcon';
import { HeartFullIcon } from '@/components/icons/heartFullIcon';
import type { ProductWithWishlisted } from '@/lib/data/products';
import { cn } from '@/lib/utils';
import React from 'react';
import { WishlistAddButton } from './wishlist/wishlistAddButton';
import { WishlistRemoveButton } from './wishlist/wishlistRemoveButton';

type Props = {
  product: ProductWithWishlisted;
  onChange?: (product: ProductWithWishlisted) => void;
  className?: string;
};

export const WishlistIconButton: React.FC<Props> = ({
  product,
  className,
  ...props
}: Props) => {
  return (
    <>
      {product.is_wishlisted ? (
        <WishlistRemoveButton
          size="icon"
          className={cn('absolute top-6 right-6 z-10', className)}
          variant="ghost"
          product={product}
          label={<HeartFullIcon className="size-7" />}
          {...props}
        />
      ) : (
        <WishlistAddButton
          size="icon"
          className={cn('absolute top-6 right-6 z-10', className)}
          variant="ghost"
          product={product}
          label={<HeartEmptyIcon className="size-7" />}
        />
      )}
    </>
  );
};
