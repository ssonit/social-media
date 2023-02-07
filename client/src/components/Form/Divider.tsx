import { FC } from 'react';

const Divider: FC = () => {
  return (
    <div className='relative flex items-center w-full my-2'>
      <div className='w-full h-[1px] bg-grayPrimary'></div>
      <div className='px-3'>Or</div>
      <div className='w-full h-[1px] bg-grayPrimary'></div>
    </div>
  );
};

export default Divider;
