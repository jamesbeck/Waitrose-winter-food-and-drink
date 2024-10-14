import React from 'react';

type Props = {
  className?: string;
};

export const PinterestIcon: React.FC<Props> = ({ className }: Props) => {
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
        d="M10.39 0C4.78 0 2 3.89 2 7.16c0 2 .72 3.73 2.33 4.4.28.1.5 0 .61-.29l.23-.94c.05-.28.05-.39-.17-.67a3.23 3.23 0 0 1-.78-2.27c0-2.9 2.22-5.5 5.83-5.5 3.17 0 4.9 1.89 4.9 4.39 0 3.33-1.5 6.27-3.73 6.27a1.96 1.96 0 0 1-1.89-2.39c.33-1.44 1.22-3 1.22-4.05 0-.94-.55-1.5-1.72-1.5-1.44 0-2.22 1.06-2.22 2.78 0 1.05.33 1.83.33 1.83s-1.39 5.33-1.5 6.28c-.22 1.94-.05 4.1-.05 4.38 0 .12.22.17.28.06.1-.17 1.6-1.94 2.1-3.78.17-.5.84-3.16.84-3.16a3.5 3.5 0 0 0 2.89 1.66c3.77 0 6.33-3.55 6.33-8.1 0-3.4-2.94-6.56-7.44-6.56Z"
      ></path>
    </svg>
  );
};
