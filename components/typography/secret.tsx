import React from 'react';

type Props = {
  value: string;
};

export const Secret: React.FC<Props> = ({ value }: Props) => {
  if (value.length <= 4) {
    return value;
  }
  const maskedSection = '*'.repeat(value.length - 4);
  const visibleSection = value.slice(-4);

  return `${maskedSection}${visibleSection}`;
};
