import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const DataContainer: React.FC<Props> = ({
  children,
  className,
}: Props) => {
  return (
    <div className={cn('grow bg-subtle-background px-6 py-3', className)}>
      {children}
    </div>
  );
};
