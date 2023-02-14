import React, { FC } from 'react';
import HeartIcon from '../Icons/HeartIcon';
import PinkHeartIcon from '../Icons/PinkHeartIcon';

const LikeButton: FC = () => {
  const like = true;
  return (
    <button>
      {like ? (
        <div className='animation-heart'>
          <PinkHeartIcon></PinkHeartIcon>
        </div>
      ) : (
        <HeartIcon></HeartIcon>
      )}
    </button>
  );
};

export default LikeButton;
