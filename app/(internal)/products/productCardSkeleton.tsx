import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

type Props = {};

export const ProductCardSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <Card>
      <Skeleton className="w-full h-48 relative bg-subtle-foreground/25" />

      <div className="space-y-2 p-3">
        <Skeleton className="h-4 bg-subtle-foreground/25" />
        <Skeleton className="h-4 bg-subtle-foreground/25" />
        <Skeleton className="h-6 bg-subtle-foreground/25" />
      </div>
    </Card>
  );
};
