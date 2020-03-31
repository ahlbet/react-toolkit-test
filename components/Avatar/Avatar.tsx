import React from 'react';

interface AvatarProps {
  avatarURL: string;
  className?: string;
  isSmall?: boolean;
  withBorder?: boolean;
}

const Avatar = (props: AvatarProps) => {
  const borderClass: string = props.withBorder && 'avatar__with-border';
  const sizeClass: string = props.isSmall && 'avatar__is-small';
  return (
    <div
      className={`avatar ${sizeClass} ${borderClass} ${props.className}`}
      style={{
        backgroundImage: `url(${
          props.avatarURL
            ? props.avatarURL
            : require('assets/images/avatar-placeholder-sqaure@3x.png')
        })`,
      }}></div>
  );
};

export default Avatar;
