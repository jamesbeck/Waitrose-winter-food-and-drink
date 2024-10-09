import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ProductWithWishlisted } from '@/lib/data/products';
import Image from 'next/image';
import React from 'react';
import { WishlistAddButton } from './wishlistAddButton';
import { WishlistRemoveButton } from './wishlistRemoveButton';

type Props = {
  product: ProductWithWishlisted;
  onChange?: (product: ProductWithWishlisted) => void;
};

export const ProductCard: React.FC<Props> = ({ product, onChange }: Props) => {
  return (
    <Card className="text-center flex flex-col relative">
      {product.is_wishlisted ? (
        <WishlistRemoveButton
          size="icon"
          className="absolute top-2 right-2 size-4 z-10"
          variant="ghost"
          product={product}
          onChange={onChange}
          labelVariant="icon"
        />
      ) : (
        <WishlistAddButton
          size="icon"
          className="absolute top-2 right-2 size-4 z-10"
          variant="ghost"
          product={product}
          onChange={onChange}
          labelVariant="icon"
        />
      )}

      <div className="w-full h-48 relative">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill={true}
            style={{ objectFit: 'contain' }}
            sizes="50vw, 25vh"
          />
        )}
      </div>

      <CardHeader className="px-3 py-0 ">
        <CardTitle className="text-sm font-normal pb-1 border-b border-subtle-foreground mb-1">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-3 py-0 grow">
        {product.supplier && (
          <div className="text-sm font-normal">{product.supplier}</div>
        )}

        {product.room && (
          <div className="text-xs font-light text-subtle-foreground">
            Stand {product.room}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3">
        {product.is_wishlisted ? (
          <WishlistRemoveButton
            size="sm"
            className="text-xs"
            product={product}
            onChange={onChange}
          />
        ) : (
          <WishlistAddButton size="sm" product={product} onChange={onChange} />
        )}
      </CardFooter>
    </Card>
  );
};
