import { FC } from 'react';
import AvatarGradient from '../Common/AvatarGradient';

const MenuItem: FC = () => {
  return (
    <div className='flex flex-col items-center gap-y-2'>
      <div className='relative w-[66px] h-[66px]'>
        <AvatarGradient size='big'></AvatarGradient>
      </div>
      <h4 className='w-16 text-xs text-graySecondary'>Tin của bạn</h4>
    </div>
  );
};

export default MenuItem;
