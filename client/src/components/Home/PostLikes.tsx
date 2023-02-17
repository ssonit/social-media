import React, { FC } from 'react';
import { IUserShort } from '~/types/user';

interface IProps {
  likes: IUserShort[];
}
const PostLikes: FC<IProps> = ({ likes }) => {
  return (
    <div className='relative cursor-pointer'>
      <div className='text-sm font-semibold text-graySecondary'>{`${likes.length} ${
        likes.length > 1 ? 'Likes' : 'Like'
      }`}</div>
      {/* <ul className='absolute bg-white top-full left-10'>
    {likes?.map((item) => (
      <li className='flex items-center' key={item._id}>
        <Avatar size='small' url={item.avatar}></Avatar>
        {item.username}
      </li>
    ))}
  </ul> */}
    </div>
  );
};

export default PostLikes;
