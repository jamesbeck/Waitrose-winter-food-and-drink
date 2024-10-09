'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { logOutAction } from './action';

type Props = {};

export const LogOutButton: React.FC<Props> = (props: Props) => {
  return <Button onClick={() => logOutAction()}>Log out</Button>;
};
