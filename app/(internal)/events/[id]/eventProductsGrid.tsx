'use client';

import { ProductCard } from '@/components/cards/productCard';
import { DataContainer } from '@/components/layout/dataContainer';
import { ProductsGridSkeleton } from '@/components/skeletons/productsGridSkeleton';
import { getEventProducts } from '@/lib/data/events';
import { type ProductWithWishlisted } from '@/lib/data/products';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  products: ProductWithWishlisted[];
  id: string;
  count: number;
};

export const EventProductsGrid: React.FC<Props> = ({
  products: initialProducts,
  id,
  count,
}: Props) => {
  const [products, setProducts] = React.useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const loadProducts = async () => {
    const next = await getEventProducts(id, products.length);

    setProducts((existing) => [...existing, ...next.items]);
  };

  const handleProductChange = (product: ProductWithWishlisted) => {
    setProducts((existing) =>
      existing.map((changed) =>
        changed.line_number === product.line_number ? product : changed
      )
    );
  };

  if (count === 0) {
    return;
  }

  return (
    <DataContainer>
      <InfiniteScroll
        dataLength={products.length}
        next={loadProducts}
        hasMore={products.length < count}
        loader={<ProductsGridSkeleton />}
      >
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.line_number}
              product={product}
              onChange={handleProductChange}
            />
          ))}
        </div>
      </InfiniteScroll>
    </DataContainer>
  );
};
