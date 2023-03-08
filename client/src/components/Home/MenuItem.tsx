import { FC } from 'react';
import AvatarGradient from '../Common/AvatarGradient';

const MenuItem: FC = () => {
  return (
    <div className='flex flex-col items-center cursor-pointer gap-y-2'>
      <div className='relative'>
        <AvatarGradient size='big'></AvatarGradient>
      </div>
      <h4 className='w-16 text-xs select-none text-graySecondary'>Tin của bạn</h4>
    </div>
  );
};

export default MenuItem;
