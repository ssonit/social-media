import React, { FC, useState } from 'react';

import HeartIcon from '../Icons/HeartIcon';
import PinkHeartIcon from '../Icons/PinkHeartIcon';

interface IProps {
  like: boolean;
  disabled?: boolean;
  handleLike?: () => void;
  className?: string;
  widthIcon?: string;
  heightIcon?: string;
  children?: React.ReactNode;
}

const LikeButton: FC<IProps> = ({
  like,
  disabled,
  handleLike,
  className = '',
  widthIcon = '24',
  heightIcon = '24',
  children,
}) => {
  const [animate, setAnimate] = useState(false);

  const handleAnimate = () => {
    setAnimate(true);

    setTimeout(() => setAnimate(false), 300);
  };
  return (
    <button
      className={`${className} ${animate ? 'animation-heart' : ''}`}
      disabled={disabled}
      onClick={() => {
        handleAnimate();
        if (handleLike) {
          handleLike();
        }
      }}
    >
      {like ? (
        <PinkHeartIcon width={widthIcon} height={heightIcon} color='#ed4956'></PinkHeartIcon>
      ) : (
        <HeartIcon width={widthIcon} height={heightIcon}></HeartIcon>
      )}

      {children}
    </button>
  );
};

export default LikeButton;
