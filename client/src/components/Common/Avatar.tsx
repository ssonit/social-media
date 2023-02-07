import { FC } from 'react';
import { avatarUrl, getPathImage, handleSetSize } from '~/utils/constants';

interface AvatarProps {
  size?: 'super' | 'big' | 'large' | 'medium' | 'small';
  url?: string;
}

const Avatar: FC<AvatarProps> = ({ size = 'medium', url = avatarUrl }) => {
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
