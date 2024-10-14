import React from 'react';

type Props = {
  className?: string;
};

export const InstagramIcon: React.FC<Props> = ({ className }: Props) => {
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
        d="M14.72 0H5.28A5.37 5.37 0 0 0 0 5.39v9.22A5.37 5.37 0 0 0 5.28 20h9.44A5.37 5.37 0 0 0 20 14.61V5.4c0-3-2.39-5.39-5.28-5.39Zm3.5 14.5a3.71 3.71 0 0 1-3.66 3.72H5.44c-2 0-3.66-1.66-3.66-3.72v-9a3.71 3.71 0 0 1 3.66-3.72h9.12c2 0 3.66 1.66 3.66 3.72v9ZM10 4.83a5.09 5.09 0 0 0-5.06 5.11A5.09 5.09 0 0 0 10 15.06a5.09 5.09 0 0 0 5.06-5.12A5.16 5.16 0 0 0 10 4.84Zm0 8.45a3.29 3.29 0 0 1-3.22-3.34A3.29 3.29 0 0 1 10 6.61c1.78 0 3.22 1.5 3.22 3.33A3.25 3.25 0 0 1 10 13.28Zm6.44-8.72c0 .66-.5 1.16-1.1 1.16-.62 0-1.12-.5-1.12-1.16 0-.67.5-1.17 1.11-1.17.61 0 1.11.55 1.11 1.17Z"
      ></path>
    </svg>
  );
};
