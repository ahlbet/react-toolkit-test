import React from 'react';

import Button from 'Elements/Button/Button';
import { TabsType } from 'types/tabs';

interface Props {
  count?: number;
  isActive: boolean;
  onClick: (title: TabsType) => void;
  type: TabsType;
}

function Tab(props: Props) {
  const { count, isActive, onClick, type } = props;

  const activeStyle = (): string => {
    return isActive ? ' tabs__tab--active' : '';
  };

  return (
    <Button
      className={`btn tabs__tab${activeStyle()}`}
      onClick={() => onClick(type)}>
      <span className="tabs__title">
        {type}
        {count > 0 && <span className="tabs__upcoming-count">{count}</span>}
      </span>
    </Button>
  );
}

export default Tab;
