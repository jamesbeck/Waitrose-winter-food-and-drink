'use client';

import { HeartFullIcon } from '@/components/icons/heartFullIcon';
import { Button, type ButtonProps } from '@/components/ui/button';
import type { ProductWithWishlisted } from '@/lib/data/products';
import { removeProductFromWishlist } from '@/lib/data/wishlist';
import React from 'react';

type Props = Omit<ButtonProps, 'onChange'> & {
  product: ProductWithWishlisted;
  onChange?: (product: ProductWithWishlisted) => void;
  labelVariant?: 'text' | 'icon';
};

export const WishlistRemoveButton: React.FC<Props> = ({
  product,
  onChange,
  labelVariant = 'text',
  ...props
}: Props) => {
  const handleRemove = async () => {
    await removeProductFromWishlist(product.line_number);

    onChange?.({ ...product, is_wishlisted: false });
  };

  return (
    <Button {...props} onClick={handleRemove}>
      {labelVariant == 'text' ? 'Remove from Wishlist' : <HeartFullIcon />}
    </Button>
  );
};
