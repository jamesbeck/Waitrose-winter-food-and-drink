import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Content: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <section className={cn('p-6 space-y-6 text-center', className)}>
      {children}
    </section>
  );
};
