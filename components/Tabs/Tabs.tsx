import React, { ReactNode } from 'react';

interface Props {
  isDesktopHidden?: boolean;
  children: ReactNode;
}

const Tabs = (props: Props) => {
  const { children, isDesktopHidden } = props;

  const isDesktopHiddenStyle: string = isDesktopHidden
    ? ' tabs__desktop-hidden'
    : '';

  return <div className={`tabs${isDesktopHiddenStyle}`}>{children}</div>;
};

export default Tabs;
