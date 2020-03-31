import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Card(props: Props) {
  const { children } = props;

  return <div className="card">{children}</div>;
}

export default Card;
