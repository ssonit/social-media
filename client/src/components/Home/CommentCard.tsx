import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Common/Avatar';
import OptionIcon from '../Icons/OptionIcon';

const CommentCard: FC = () => {
  return (
    <div className='flex gap-2 mb-1'>
      <Avatar size='small'></Avatar>
      <div className='flex flex-col text-sm'>
        <div className='px-4 py-1.5 rounded-xl bg-grayPrimary'>
          <Link to={`/`}>
            <h3 className='font-semibold'>songnuye</h3>
          </Link>
          <p>hao han</p>
        </div>
        <div className='flex items-center gap-4 ml-2 text-sm text-grayText'>
          <button>Like</button>
          <button>Reply</button>
          <span>14 giờ</span>
        </div>
      </div>
      <button className='mb-10 mt-4 p-0.5 inline-block hover:bg-grayPrimary rounded-full'>
        <OptionIcon></OptionIcon>
      </button>
    </div>
  );
};

export default CommentCard;
