import { FC } from 'react';
import { avatarUrl, getPathImage, handleSetSize } from '~/utils/constants';

interface AvatarGradientProps {
  size?: 'big' | 'medium' | 'small';
  url?: string;
}
const AvatarGradient: FC<AvatarGradientProps> = ({ size = 'medium', url = avatarUrl }) => {
  const classSize = handleSetSize(size);
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center'>
        <div className='p-0.5 rounded-full flex items-center justify-center avatar-gradient'>
          <div className='bg-white p-0.5 w-full h-full flex items-center justify-center rounded-full'>
            <img
              src={getPathImage(url)}
              className={`object-cover rounded-full select-none ${classSize}`}
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarGradient;
