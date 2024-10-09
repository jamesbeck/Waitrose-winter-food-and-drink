import React from 'react';
import { ProductCardSkeleton } from './productCardSkeleton';

type Props = {};

export const ProductsGridSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <div className="py-6 grid grid-cols-2 gap-6">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
};
