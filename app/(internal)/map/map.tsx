import FestivalMap from '@/images/festival-map.svg';
import Image from 'next/image';
import React from 'react';

type Props = {};

export const Map: React.FC<Props> = (props: Props) => {
  return (
    <div className="w-full h-full content-center bg-[#6E5093]">
      <Image src={FestivalMap} alt="Festival map" />
    </div>
  );
};
