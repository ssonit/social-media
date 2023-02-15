import React, { FC } from 'react';

const LoadingModal: FC = () => {
  return (
    <div className='w-6 h-6 border-2 rounded-full border-x-transparent animate-spin border-y-bluePrimary'></div>
  );
};

export default LoadingModal;
