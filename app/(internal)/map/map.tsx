'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShowMapGround from '@/images/show-map-ground.svg';
import ShowMapVaults from '@/images/show-map-vaults.svg';
import Image from 'next/image';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { KeyDrawer } from './keyDrawer';

type Props = {};

export const Map: React.FC<Props> = (props: Props) => {
  return (
    <div className="w-full h-[calc(100svh-5rem)] bg-[#C09554] relative">
      <KeyDrawer />

      <Tabs defaultValue="ground">
        <TabsList className="grid grid-cols-2 absolute top-24 left-[7.5%] z-20 w-[85%] mx-auto">
          <TabsTrigger value="ground" className="text-lg">
            Ground Floor
          </TabsTrigger>
          <TabsTrigger value="vaults" className="text-lg">
            Vaults Floor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ground">
          <TransformWrapper>
            <TransformComponent>
              <div className="h-[calc(100svh-5rem)] flex items-center">
                <Image src={ShowMapGround} alt="Festival map" />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </TabsContent>

        <TabsContent value="vaults">
          <TransformWrapper>
            <TransformComponent>
              <div className="h-[calc(100svh-5rem)] flex items-center">
                <Image src={ShowMapVaults} alt="Festival map" />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
};
