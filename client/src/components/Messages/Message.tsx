import React, { FC } from 'react';
import Avatar from '../Common/Avatar';

interface IProps {
  own: boolean;
  content: string;
}
const Message: FC<IProps> = ({ own, content }) => {
  return (
    <li className={`flex items-start gap-1.5 max-w-[80%] ${own ? 'ml-auto' : 'justify-start'}`}>
      {!own && <Avatar size='medium'></Avatar>}
      <div className='px-2 bg-white rounded-md py-1 min-w-[100px]'>
        {!own && <div className='font-medium text-bluePrimary/60'>son</div>}
        <p className='text-sm'>{content}</p>
        <div className='flex-shrink-0 mt-0.5 text-xs text-gray-400'>05:11</div>
      </div>
    </li>
  );
};

export default Message;
