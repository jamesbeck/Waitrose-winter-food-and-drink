import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export const InlineLink: React.FC<Props> = ({ className, ...props }: Props) => {
  return <Link className={cn('underline font-bold', className)} {...props} />;
};
