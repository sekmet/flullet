import { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import { AppConfig } from '@/components/utils/AppConfig';

type ISuperrareProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Superrare = (props: ISuperrareProps) => {

  return (
    <div className="antialiased w-full text-gray-700 px-1">
    {props.meta}
    <div className="py-1 text-xl content">{props.children}</div>
    </div>
  );

}

export { Superrare };
    