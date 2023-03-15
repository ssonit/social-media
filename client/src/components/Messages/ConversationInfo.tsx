import React, { FC, useContext, useMemo } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { ConversationContext } from '~/contexts/ConversationContext';
import { IUserShort } from '~/types/user';
import Avatar from '../Common/Avatar';
import { motion } from 'framer-motion';

interface IProps {
  members: IUserShort[];
  name: string;
  latestMessage?: string;
}

const ConversationInfo: FC<IProps> = ({ members, name, latestMessage }) => {
  const { currentUser } = useContext(AppContext);
  const { onlineUsers } = useContext(ConversationContext);
  const friends = members.filter((member) => member._id !== currentUser?._id);

  const online = useMemo(() => {
    if (friends.length === 1) {
      return onlineUsers.some((item) => item.userId === friends[0]._id);
    }
    return false;
  }, [friends, onlineUsers]);

  return (
    <>
      <div className='relative shrink-0'>
        <Avatar size='large' url={friends[0].avatar}></Avatar>
        {online && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='absolute bottom-0 right-0'
          >
            <div className='bg-white rounded-full p-0.5'>
              <div className='w-2 h-2 rounded-full bg-bluePrimary'></div>
            </div>
          </motion.div>
        )}
      </div>
      <div className='ml-3 mr-auto leading-5 text-left truncate'>
        <div className='font-semibold'>{name}</div>
        <p className='text-sm text-gray-500 truncate'>
          {latestMessage ?? 'You are currently connected to this user'}
        </p>
      </div>
    </>
  );
};

export default ConversationInfo;
