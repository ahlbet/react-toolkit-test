import React from 'react';

interface Props {
  isVisible: boolean;
  message: string;
}

const Error = (props: Props) => {
  const { isVisible, message } = props;

  if (!isVisible) {
    return null;
  }

  return <p className="error-message">{message}</p>;
}

export default Error;
