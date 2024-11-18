'use client';

import { BackIcon } from '@/components/icons/backIcon';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import MapAccessibleEntry from '@/images/map-accessible-entry.svg';
import MapGlassWashPointImage from '@/images/map-glass-wash-point.svg';
import MapGoodyBagImage from '@/images/map-goody-bag.svg';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {};

export const KeyDrawer: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen} modal={false}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-white absolute top-6 right-6 bg-transparent  border-none rounded text-base w-fit z-20 bg-[#93743F]"
        >
          Key to Map
        </Button>
      </DrawerTrigger>

      <DrawerContent
        overlay={false}
        className="p-6 left-0 space-y-12 top-16 bottom-0 mt-0 rounded-none border-none w-full"
      >
        <div className="overflow-y-auto overflow-x-hidden">
          <DialogHeader className="relative">
            <Button
              variant="ghost"
              className="absolute left-0 top-1.5 w-fit h-fit p-0"
              onClick={() => setOpen(false)}
            >
              <BackIcon />
            </Button>

            <div>
              <DialogTitle>Key to map</DialogTitle>

              <DialogDescription className="hidden">
                Key to map
              </DialogDescription>
            </div>

            <div className="pt-12 space-y-6">
              <div className="flex space-x-6 items-center">
                <div className="size-10 bg-[#A66776]"></div>
                <div className="uppercase">Wine</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 bg-[#B8D437]"></div>
                <div className="uppercase">Spirits</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 bg-[#8A5D3B]"></div>
                <div className="uppercase">Beer &amp; Cider</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 bg-[#80163E]"></div>
                <div className="uppercase">Waitrose Experiences</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 bg-[#FFFFFF] border border-neutral-400"></div>
                <div className="uppercase">VIP Lounge</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 relative">
                  <Image src={MapGoodyBagImage} alt="Goody bag" fill />
                </div>

                <div className="uppercase">Goody Bag Collection Point</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 relative">
                  <Image
                    src={MapGlassWashPointImage}
                    alt="Glass wash point"
                    fill
                  />
                </div>
                <div className="uppercase">Glass Wash Point</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 bg-[#D71B5C]"></div>
                <div className="uppercase">Toilets</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 relative">
                  <Image src={MapAccessibleEntry} alt="Goody bag" fill />
                </div>

                <div className="uppercase">Accessible Entry</div>
              </div>

              <div className="flex space-x-6 items-center">
                <div className="size-10 bg-[#DC8C72]"></div>
                <div className="uppercase">Facilities</div>
              </div>
            </div>
          </DialogHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
