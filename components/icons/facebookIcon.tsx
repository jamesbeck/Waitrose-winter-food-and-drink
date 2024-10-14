import React from 'react';

type Props = {
  className?: string;
};

export const FacebookIcon: React.FC<Props> = ({ className }: Props) => {
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
        d="M11.7222 20V10.8889H14.7778L15.2222 7.33333H11.7222V5.05556C11.7222 4 12 3.33333 13.5 3.33333H15.3889V0.166667C15 0.111111 13.8889 0 12.6111 0C9.88889 0 8.05556 1.66667 8.05556 4.72222V7.33333H5V10.8889H8.05556V20H11.7222Z"
      ></path>
    </svg>
  );
};
