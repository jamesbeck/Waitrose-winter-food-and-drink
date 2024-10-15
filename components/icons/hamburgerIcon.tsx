import React from 'react';

type Props = {
  className?: string;
};

export const HamburgerIcon: React.FC<Props> = ({ className }: Props) => {
  return (
    <svg
      width="25"
      height="19"
      viewBox="0 0 25 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        x1="0.5"
        y1="1.5"
        x2="24.5"
        y2="1.5"
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1="0.5"
        y1="9.5"
        x2="24.5"
        y2="9.5"
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1="0.5"
        y1="17.5"
        x2="24.5"
        y2="17.5"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};
