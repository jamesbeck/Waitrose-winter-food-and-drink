import { cn } from '@/lib/utils';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Colour = 'red' | 'green' | 'brown';

type Props = {
  text: string;
  icon?: React.ReactNode;
  image?: StaticImageData;
  href?: string;
  align: 'left' | 'right';
  colours: [Colour, Colour, Colour];
};

export const MenuItem: React.FC<Props> = ({
  text,
  icon,
  image,
  href,
  align,
  colours,
}: Props) => {
  const colourClasses = colours.map((colour) => {
    switch (colour) {
      case 'red':
        return 'bg-waitrose-red text-waitrose-brown';
      case 'green':
        return 'bg-waitrose-lime text-waitrose-red';
      case 'brown':
        return 'bg-waitrose-brown text-waitrose-red';
    }
  });

  const content = (
    <>
      <div className="flex min-h-48">
        <div
          className={cn(
            align === 'left' ? 'grow relative' : 'w-16',
            align === 'left' ? '' : colourClasses[0]
          )}
        >
          {align === 'left' && image ? (
            <Image src={image} alt={text} fill className="object-cover" />
          ) : (
            ''
          )}
        </div>
        <div
          className={cn(
            align === 'left' ? 'w-16' : 'grow relative',
            align === 'left' ? colourClasses[0] : ''
          )}
        >
          {align === 'right' && image ? (
            <Image src={image} alt={text} fill className="object-cover" />
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="flex h-16">
        <div
          className={cn(
            'flex justify-center items-center',
            align === 'left' ? 'grow uppercase text-2xl' : 'w-16',
            colourClasses[1]
          )}
        >
          {align === 'left' ? text : icon}
        </div>
        <div
          className={cn(
            'flex justify-center items-center',
            align === 'left' ? 'w-16' : 'grow uppercase text-2xl',
            colourClasses[2]
          )}
        >
          {align === 'left' ? icon : text}
        </div>
      </div>
    </>
  );

  return href ? <Link href={href}>{content}</Link> : <>{content}</>;
};
