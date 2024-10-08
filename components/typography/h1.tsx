import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const H1: React.FC<Props> = ({ children, className }: Props) => {
  return <h1 className={cn('text-xl text-center', className)}>{children}</h1>;
};
