'use client';

import { BackIcon } from '@/components/icons/backIcon';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

export const BackButton: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="absolute top-6 left-6 z-10"
    >
      <BackIcon className="size-5" />
    </Button>
  );
};
