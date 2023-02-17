import moment from 'moment';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IUserShort } from '~/types/user';
import AvatarGradient from '../Common/AvatarGradient';

interface IProps {
  userId: IUserShort;
  createdAt: string;
  children?: React.ReactNode;
}
const PostHeader: FC<IProps> = ({ createdAt, userId, children }) => {
  return (
    <div className='flex items-center justify-between px-4 py-2'>
      <div className='flex items-center gap-2'>
        <Link to={`/profile/${userId?._id}`}>
          <AvatarGradient size='medium' url={userId?.avatar}></AvatarGradient>
        </Link>
        <div className='flex flex-col text-graySecondary'>
          <div className='flex items-center gap-2'>
            <Link to={`/profile/${userId?._id}`}>
              <h3 className='text-sm font-semibold'>{userId?.username || ''}</h3>
            </Link>
          </div>
          <div className='text-grayText text-[10px] font-semibold leading-3'>
            {moment(createdAt).fromNow()}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default PostHeader;
