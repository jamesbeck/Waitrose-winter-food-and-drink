import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const containerVariants = cva('space-y-2', {
  variants: {
    width: {
      narrow: 'px-12',
      wide: 'px-6',
    },
  },
  defaultVariants: {
    width: 'narrow',
  },
});

type Props = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

export const Container: React.FC<Props> = ({
  className,
  width,
  ...props
}: Props) => {
  return (
    <div className={cn(containerVariants({ width }), className)} {...props} />
  );
};
