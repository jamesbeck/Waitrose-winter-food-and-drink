import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Small: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <small className={cn('text-subtle-foreground', className)}>
      {children}
    </small>
  );
};
