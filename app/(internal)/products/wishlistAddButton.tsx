'use client';

import { HeartEmptyIcon } from '@/components/icons/heartEmptyIcon';
import { Button, type ButtonProps } from '@/components/ui/button';
import type { ProductWithWishlisted } from '@/lib/data/products';
import { addProductToWishlist } from '@/lib/data/wishlist';
import React from 'react';

type Props = Omit<ButtonProps, 'onChange'> & {
  product: ProductWithWishlisted;
  onChange?: (product: ProductWithWishlisted) => void;
  labelVariant?: 'text' | 'icon';
};

export const WishlistAddButton: React.FC<Props> = ({
  product,
  onChange,
  labelVariant = 'text',
  ...props
}: Props) => {
  const handleAdd = async () => {
    await addProductToWishlist(product.line_number);

    onChange?.({ ...product, is_wishlisted: true });
  };

  return (
    <Button onClick={handleAdd} {...props}>
      {labelVariant === 'text' ? 'Add to Wishlist' : <HeartEmptyIcon />}
    </Button>
  );
};
