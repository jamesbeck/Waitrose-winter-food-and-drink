'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import type { ProductWithWishlisted } from '@/lib/data/products';
import { addProductToWishlist } from '@/lib/data/wishlist';
import React from 'react';

type Props = Omit<ButtonProps, 'onChange'> & {
  product: ProductWithWishlisted;
  onChange?: (product: ProductWithWishlisted) => void;
  label?: string | React.ReactNode;
};

export const WishlistAddButton: React.FC<Props> = ({
  product,
  onChange,
  label = 'Add to wishlist',
  ...props
}: Props) => {
  const handleAdd = async () => {
    const success = await addProductToWishlist(product.line_number);

    if (!success) {
      return;
    }

    onChange?.({ ...product, is_wishlisted: true });
  };

  return (
    <>
      <Button onClick={handleAdd} {...props}>
        {label}
      </Button>
    </>
  );
};
