import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Lead: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <p className={cn('text-base text-gray-700 font-light', className)}>
      {children}
    </p>
  );
};
