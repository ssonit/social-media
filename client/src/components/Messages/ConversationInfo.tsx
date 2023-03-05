import React, { FC } from 'react';
import Avatar from '../Common/Avatar';

const ConversationInfo: FC = () => {
  return (
    <div className='flex items-center flex-1 gap-3'>
      <Avatar size='large'></Avatar>
      <div className='leading-5 text-left'>
        <div className='font-semibold'>studio</div>
        <p className='text-sm text-gray-500'>Mas happy typing...</p>
      </div>
    </div>
  );
};

export default ConversationInfo;
