import React from 'react';
import { Lead } from '../typography/lead';

type Props = {
  heading: string;
  message: string;
};

export const EmptyMessage: React.FC<Props> = ({ heading, message }: Props) => {
  return (
    <div className="text-center">
      <h3 className="text-xl">{heading}</h3>
      <Lead>{message}</Lead>
    </div>
  );
};
