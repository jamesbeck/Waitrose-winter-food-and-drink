'use client';

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
  label = 'Remove from Wishlist',
  ...props
}: Props) => {
  const handleRemove = async () => {
    await removeProductFromWishlist(product.line_number);

    onChange?.({ ...product, is_wishlisted: false });
  };

  return (
    <Button onClick={handleRemove} {...props}>
      {label}
    </Button>
  );
};
