import { FC } from 'react';
import { IPropsAvatar } from '~/types/global';
import { avatarUrl, getPathImage, handleSetSize } from '~/utils/constants';

const Avatar: FC<IPropsAvatar> = ({ size = 'medium', url = avatarUrl }) => {
  const classSize = handleSetSize(size);
  return (
    <div className={`shrink-0 ${classSize}`}>
      <img
        src={getPathImage(url)}
        alt='avatar'
        className='object-cover w-full h-full rounded-full select-none shrink-0'
      />
    </div>
  );
};

export default Avatar;
