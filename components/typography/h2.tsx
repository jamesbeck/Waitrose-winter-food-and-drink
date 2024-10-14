import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const H2: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <h2 className={cn('text-base text-left uppercase', className)}>
      {children}
    </h2>
  );
};
