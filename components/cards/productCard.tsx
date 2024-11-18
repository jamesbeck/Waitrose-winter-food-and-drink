import { WishlistButton } from '@/components/buttons/wishlistButton';
import { WishlistIconButton } from '@/components/buttons/wishlistIconButton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PlaceholderImage from '@/images/placeholder.jpg';
import type { ProductWithWishlisted } from '@/lib/data/products';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  product: ProductWithWishlisted;
  onChange?: (product: ProductWithWishlisted) => void;
};

export const ProductCard: React.FC<Props> = ({ product, onChange }: Props) => {
  return (
    <Card className="text-center flex flex-col relative">
      <WishlistIconButton
        product={product}
        onChange={onChange}
        className="top-2 right-2 size-4"
      />

      <Link href={`/products/${product.line_number}`}>
        <div className="w-full h-48 relative">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="50vw, 25vh"
            />
          ) : (
            <Image
              src={PlaceholderImage}
              alt={product.name}
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="50vw, 25vh"
            />
          )}
        </div>

        <CardHeader className="px-3 py-0 ">
          <CardTitle className="text-sm pb-1 border-b border-subtle-foreground mb-1">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3 py-0 grow">
          {product.supplier && (
            <div className="text-sm font-normal">{product.supplier}</div>
          )}
        </CardContent>
      </Link>

      <CardFooter className="p-3">
        <WishlistButton size="sm" product={product} onChange={onChange} />
      </CardFooter>
    </Card>
  );
};
