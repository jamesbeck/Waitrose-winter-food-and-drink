'use client';

import { ProductCard } from '@/components/cards/productCard';
import { EmptyMessage } from '@/components/content/emptyMessage';
import { DataContainer } from '@/components/layout/dataContainer';
import { ProductsGridSkeleton } from '@/components/skeletons/productsGridSkeleton';
import { type ProductWithWishlisted } from '@/lib/data/products';
import { getWishlist } from '@/lib/data/wishlist';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  products: ProductWithWishlisted[];
  search?: string;
  count: number;
};

export const WishlistGrid: React.FC<Props> = ({
  products: initialProducts,
  search,
  count,
}: Props) => {
  const [products, setProducts] = React.useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const loadProducts = async () => {
    const next = await getWishlist({ offset: products.length, search });

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
    return (
      <DataContainer className="grow p-12 content-center">
        <EmptyMessage
          heading="You have no items in your wishlist"
          message="To add items, please head over to the products section and browse the available products"
        />
      </DataContainer>
    );
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
