import React from 'react';

type Props = {};

export const CrossIcon: React.FC<Props> = (props: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 2L19 19" stroke="#202020" strokeWidth="2" />
      <path d="M19 1L1 19" stroke="#202020" strokeWidth="2" />
    </svg>
  );
};
