import { ReactNode } from 'react';

type ICollectionProps = {
  meta: ReactNode;
  children: ReactNode;
};

const CollectionTmpl = (props: ICollectionProps) => {
  return (
    <div className="antialiased w-full text-gray-700 px-1">
      {props.meta}
      <div className="py-1 content">{props.children}</div>
    </div>
  );
};

export { CollectionTmpl };
