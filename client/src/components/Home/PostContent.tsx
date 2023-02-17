import React, { FC } from 'react';
import { IUserShort } from '~/types/user';

interface IProps {
  userId: IUserShort;
  description: string;
}
const PostContent: FC<IProps> = ({ description, userId }) => {
  return (
    <div className='flex gap-2 text-sm text-graySecondary'>
      <h3 className='inline-block font-semibold'>{userId?.username}</h3>
      <span>{description || 'Cà phê, đọc sách, chuyện trò cùng nhau đii ✏️'}</span>
    </div>
  );
};

export default PostContent;
