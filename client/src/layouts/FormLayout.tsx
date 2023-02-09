import { FC } from 'react';
import { instagram } from '~/assets';

interface IProps {
  children?: React.ReactNode;
}

const FormLayout: FC<IProps> = ({ children }) => {
  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen overflow-y-auto sm:top-1/2 sm:bg-[#f1f3f4]'>
      <div className='max-w-[350px] bg-white px-8 w-full sm:border sm:border-grayPrimary rounded-lg'>
        <div className='w-[175px] h-[51px] my-5 relative left-1/2 -translate-x-1/2'>
          <img src={instagram} alt='instagram' className='object-cover w-full h-full text-white' />
        </div>
        <div className='text-graySecondary'>{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
