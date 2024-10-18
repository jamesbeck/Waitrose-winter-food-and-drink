'use client';

import { BackIcon } from '@/components/icons/backIcon';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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
          className="text-white absolute top-6 right-6 bg-transparent border-white rounded-none text-base w-fit z-20 bg-[#6E5093]"
        >
          Key to Map
        </Button>
      </DrawerTrigger>

      <DrawerContent
        overlay={false}
        className="p-6 left-0 space-y-12 top-16 bottom-0 mt-0 rounded-none border-none w-full overflow-y-auto overflow-x-hidden"
      >
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

            <DialogDescription className="hidden">Key to map</DialogDescription>
          </div>

          <div className="py-12 space-y-6">
            <div className="flex space-x-6 items-center">
              <div className="size-10 bg-[#E0B1C6]"></div>
              <div className="uppercase">Wine</div>
            </div>

            <div className="flex space-x-6 items-center">
              <div className="size-10 bg-[#9FCDE1]"></div>
              <div className="uppercase">Spirits</div>
            </div>

            <div className="flex space-x-6 items-center">
              <div className="size-10 bg-[#ECCF83]"></div>
              <div className="uppercase">Beer &amp; Cider</div>
            </div>

            <div className="flex space-x-6 items-center">
              <div className="size-10 bg-[#9EC498]"></div>
              <div className="uppercase">Cosy Corner</div>
            </div>

            <div className="flex space-x-6 items-center">
              <div className="size-10 bg-[#B08D84]"></div>
              <div className="uppercase">Mindful Drinking Den</div>
            </div>

            <div className="flex space-x-6 items-center">
              <div className="size-10 bg-[#A99CC5]"></div>
              <div className="uppercase">Waitrose Experiences</div>
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
              <div className="size-10 bg-[#ED67A5]"></div>
              <div className="uppercase">Toilets</div>
            </div>

            <div className="flex space-x-6 items-center">
              <div className="size-10 bg-[#DC8C72]"></div>
              <div className="uppercase">Facilities</div>
            </div>
          </div>
        </DialogHeader>
      </DrawerContent>
    </Drawer>
  );
};
