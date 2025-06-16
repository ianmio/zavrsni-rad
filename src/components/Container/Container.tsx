import { ElementType, ReactNode } from 'react';

import { cn } from '@utils/tailwind';

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

const Container = ({
  children,
  as: Component = 'div',
  className,
}: ContainerProps) => {
  return (
    <Component className={cn('max-w-[1328px] w-full px-6 mx-auto', className)}>
      {children}
    </Component>
  );
};

export default Container;
