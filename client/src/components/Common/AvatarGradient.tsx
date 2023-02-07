import { FC } from 'react';
import { handleSetSize } from '~/utils/constants';

interface AvatarGradientProps {
  size?: 'big' | 'medium' | 'small';
  url?: string;
}
const AvatarGradient: FC<AvatarGradientProps> = ({ size = 'medium', url }) => {
  const classSize = handleSetSize(size);
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center'>
        <div className='p-[2px] rounded-full flex items-center justify-center avatar'>
          <div className='bg-white p-[3px] w-full h-full flex items-center justify-center rounded-full'>
            <img
              src={
                url ||
                'https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-deo-kinh-1.jpg'
              }
              className={`object-cover rounded-full ${classSize}`}
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarGradient;
