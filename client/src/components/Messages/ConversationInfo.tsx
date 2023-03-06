import React, { FC, useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { IConversation } from '~/types/conversation';
import Avatar from '../Common/Avatar';

type IProps = Pick<IConversation, 'members' | 'name'>;

const ConversationInfo: FC<IProps> = ({ members, name }) => {
  const { currentUser } = useContext(AppContext);
  const friends = members.filter((member) => member._id !== currentUser?._id);
  return (
    <div className='flex items-center flex-1 gap-3'>
      <Avatar size='large' url={friends[0].avatar}></Avatar>
      <div className='leading-5 text-left'>
        <div className='font-semibold'>{name}</div>
        <p className='text-sm text-gray-500'>Mas happy typing...</p>
      </div>
    </div>
  );
};

export default ConversationInfo;
