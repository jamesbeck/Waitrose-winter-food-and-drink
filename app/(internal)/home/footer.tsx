import { FacebookIcon } from '@/components/icons/facebookIcon';
import { InstagramIcon } from '@/components/icons/instagramIcon';
import { PinterestIcon } from '@/components/icons/pinterestIcon';
import { XIcon } from '@/components/icons/xIcon';
import Link from 'next/link';
import React from 'react';

type Props = {};

export const Footer: React.FC<Props> = (props: Props) => {
  return (
    <footer className="flex border-t border-subtle-foreground/50 mt-6 mx-3 text-subtle-foreground/50 text-xs py-3">
      <div className="grow">All content copyright</div>

      <div className="flex space-x-3">
        <Link href="https://x.com/waitrose">
          <XIcon className="size-4" />
        </Link>

        <Link href="https://www.facebook.com/waitrose">
          <FacebookIcon className="size-4" />
        </Link>

        <Link href="http://www.pinterest.co.uk/waitroseandpartners">
          <PinterestIcon className="size-4" />
        </Link>

        <Link href="https://www.instagram.com/waitrose/">
          <InstagramIcon className="size-4" />
        </Link>
      </div>
    </footer>
  );
};
