import React from 'react';

type Props = {
  className?: string;
};

export const XIcon: React.FC<Props> = ({ className }: Props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="16px"
      width="16px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="currentColor"
        d="M11.862 8.469 19.147 0h-1.726l-6.326 7.353L6.042 0H.215l7.64 11.12L.215 20h1.726l6.68-7.765L13.958 20h5.828L11.86 8.469Zm-2.365 2.748-.774-1.107-6.16-8.81h2.652l4.971 7.11.774 1.107 6.462 9.242H14.77l-5.273-7.541Z"
      ></path>
    </svg>
  );
};
