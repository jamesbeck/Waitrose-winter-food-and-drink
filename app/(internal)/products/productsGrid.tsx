'use client';

import { getProducts, type ProductWithWishlisted } from '@/lib/data/products';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductCard } from './productCard';
import { ProductsGridSkeleton } from './productsGridSkeleton';

type Props = {
  products: ProductWithWishlisted[];
  search?: string;
  count: number;
};

export const ProductsGrid: React.FC<Props> = ({
  products: initialProducts,
  search,
  count,
}: Props) => {
  const [products, setProducts] = React.useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const loadProducts = async () => {
    const next = await getProducts({ offset: products.length, search });

    setProducts((existing) => [...existing, ...next.items]);
  };

  const handleProductChange = (product: ProductWithWishlisted) => {
    setProducts((existing) =>
      existing.map((changed) =>
        changed.line_number === product.line_number ? product : changed
      )
    );
  };

  return (
    <div className="bg-subtle-background px-6 py-3">
      {count === 0 ? (
        <p className="text-center text-gray-500">
          No products found. Try searching for something else.
        </p>
      ) : (
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
      )}
    </div>
  );
};
