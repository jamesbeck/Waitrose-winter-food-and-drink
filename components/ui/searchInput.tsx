import { cn } from '@/lib/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CrossIcon } from '../icons/crossIcon';
import { SearchIcon } from '../icons/searchIcon';
import { Input, type InputProps } from './input';

type Props = InputProps;

export const SearchInput: React.FC<Props> = ({
  className,
  name,
  ...props
}: Props) => {
  const form = useFormContext();

  return (
    <div className="relative">
      <Input
        type="text"
        autoFocus
        className={cn(
          'bg-transparent rounded-none pt-1 border-b border-subtle-foreground placeholder:text-subtle-foreground px-3 text-black pr-6',
          className
        )}
        name={name}
        {...props}
      />
      <div className="absolute right-3 top-3 hidden peer-placeholder-shown:block">
        <SearchIcon className="size-4" />
      </div>
      <div
        className="absolute right-3 top-3 block peer-placeholder-shown:hidden"
        onClick={() => {
          if (name) {
            form.setValue(name, '');
            form.setFocus(name);
          }
        }}
      >
        <CrossIcon className="size-4" />
      </div>
    </div>
  );
};
