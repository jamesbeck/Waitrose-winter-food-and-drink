'use client';

import FestivalMap from '@/images/festival-map.svg';
import Image from 'next/image';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { KeyDrawer } from './keyDrawer';

type Props = {};

export const Map: React.FC<Props> = (props: Props) => {
  return (
    <div className="w-full h-svh bg-[#6E5093]">
      <KeyDrawer />

      <TransformWrapper>
        <TransformComponent>
          <div className="h-svh flex content-center">
            <Image src={FestivalMap} alt="Festival map" />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
