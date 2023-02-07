import { FC } from 'react';
import Avatar from '../Common/Avatar';
import PlusCircleIcon from '../Icons/PlusCircleIcon';

const MenuNews: FC = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-2'>
      <div className='relative'>
        <Avatar size='big'></Avatar>
        <div className='absolute bottom-0 right-0'>
          <PlusCircleIcon></PlusCircleIcon>
        </div>
      </div>
      <h4 className='w-16 text-xs translate-y-1 text-graySecondary'>Tin của bạn</h4>
    </div>
  );
};

export default MenuNews;
