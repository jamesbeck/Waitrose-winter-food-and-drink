'use client';

import { CrossIcon } from '@/components/icons/crossIcon';
import { ForwardIcon } from '@/components/icons/forwardIcon';
import { HamburgerIcon } from '@/components/icons/hamburgerIcon';
import { UserIcon } from '@/components/icons/userIcon';
import { Secret } from '@/components/typography/secret';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
    name: 'Home',
    href: '/home',
  },
  {
    name: 'What’s On',
    description: 'See everything on at the festival',
    href: '/whats-on',
  },
  {
    name: 'My Schedule',
    description: 'Add sessions to your schedule',
    href: '/schedule',
  },
  {
    name: 'Masterclass',
    description: 'Add your pre-booked sessions to your schedule',
    href: '/masterclasses',
  },
  {
    name: 'Products',
    description: 'View our available products',
    href: '/products',
  },
  {
    name: 'My Wishlist',
    description: 'Your best of the fest!',
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

      <DrawerContent className="right-0 top-0 bottom-0 mt-0 rounded-none border-none max-w-96 w-4/5">
        <div className="max-h-svh overflow-y-auto overflow-x-hidden">
          <DialogHeader className="p-6">
            <div className="flex justify-between items-center">
              <div className="grow">
                <DialogTitle className="uppercase text-left text-xl font-normal">
                  Main Menu
                </DialogTitle>

                <DialogDescription className="hidden">
                  Main app navigation
                </DialogDescription>
              </div>

              <div>
                <Button
                  variant="ghost"
                  className="p-2 h-fit"
                  onClick={() => setOpen(false)}
                >
                  <CrossIcon />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-col h-full">
            <div className="px-6 grow flex flex-col justify-center">
              {links.map(({ href, name, description }) => (
                <a
                  key={href}
                  onClick={() => {
                    router.push(href);
                    setOpen(false);
                  }}
                  className="block space-y-1 border-b border-subtle-foreground py-3 pr-3"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="uppercase">{name}</h2>
                    {!description && <ForwardIcon />}
                  </div>

                  {description && (
                    <div className="flex justify-between items-center">
                      <p className="font-light text-dark-grey">{description}</p>
                      <ForwardIcon />
                    </div>
                  )}
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
                          <div className="font-light">
                            MyWaitrose Card Number:
                          </div>
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
                  className="my-6"
                  size="sm"
                >
                  Login
                </Button>
              )}
            </div>

            <div>
              <Image src={MenuFooterImage} alt="menu footer" />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
