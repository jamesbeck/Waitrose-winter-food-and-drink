'use client';

import { CrossIcon } from '@/components/icons/crossIcon';
import { ForwardIcon } from '@/components/icons/forwardIcon';
import { HamburgerIcon } from '@/components/icons/hamburgerIcon';
import { UserIcon } from '@/components/icons/userIcon';
import { H1 } from '@/components/typography/h1';
import { Secret } from '@/components/typography/secret';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import MenuFooterImage from '@/images/menu-footer.png';
import type { User } from 'knex/types/tables';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  user?: User;
};

const links = [
  {
    name: "What's On",
    description: 'See everything on at the festival',
    href: '/whats-on',
  },
  {
    name: 'My Schedule',
    description: 'View and edit your schedule',
    href: '/schedule',
  },
  {
    name: 'Masterclass',
    description: 'View and sign up to classes',
    href: '/masterclasses',
  },
  {
    name: 'Products',
    description: 'View our available products',
    href: '/products',
  },
  {
    name: 'My Wishlist',
    description: 'View all your saved products',
    href: '/wishlist',
  },
];

export const Menu: React.FC<Props> = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-auto">
          <HamburgerIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="right-0 top-0 bottom-0 mt-0 rounded-none w-4/5 border-none">
        <div className="p-6 grow">
          <div className="flex justify-between items-center mb-6">
            <div className="grow">
              <H1 className="uppercase text-left">Main Menu</H1>
            </div>

            <div>
              <Button
                variant="ghost"
                className="p-0 h-fit mt-2"
                onClick={() => setOpen(false)}
              >
                <CrossIcon />
              </Button>
            </div>
          </div>

          {links.map(({ href, name, description }) => (
            <a
              key={href}
              onClick={() => {
                router.push(href);
                setOpen(false);
              }}
              className="block space-y-1 border-b border-subtle-foreground py-3 pr-3"
            >
              <h2 className="uppercase">{name}</h2>

              <div className="flex justify-between items-center">
                <p className="font-light text-dark-grey">{description}</p>

                <ForwardIcon />
              </div>
            </a>
          ))}

          {user ? (
            <a
              onClick={() => {
                router.push('/profile');
                setOpen(false);
              }}
            >
              <div className="py-6 flex item-center space-x-6">
                <div className="rounded-full size-20 bg-waitrose-lime/10 p-3">
                  <UserIcon className="w-full h-full" />
                </div>

                <div>
                  <div>{[user.first_name, user.last_name].join(' ')}</div>
                  {user.loyalty_card_number && (
                    <>
                      <div className="font-light">MyWaitrose Card Number:</div>
                      <div className="font-light">
                        <Secret value={user.loyalty_card_number} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </a>
          ) : (
            <Button
              onClick={() => {
                router.push('/log-in');
                setOpen(false);
              }}
              className="mt-6"
            >
              Login
            </Button>
          )}
        </div>

        <Image src={MenuFooterImage} alt="menu footer" />
      </DrawerContent>
    </Drawer>
  );
};
