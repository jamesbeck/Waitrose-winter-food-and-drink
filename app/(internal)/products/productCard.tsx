import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from 'knex/types/tables';
import Image from 'next/image';
import React from 'react';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }: Props) => {
  return (
    <Card className="text-center flex flex-col">
      <div className="w-full h-48 relative">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill={true}
            style={{ objectFit: 'contain' }}
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
        <Button size="sm">Add to Wishlist</Button>
      </CardFooter>
    </Card>
  );
};
