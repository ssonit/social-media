import moment from 'moment';
import React, { FC, useContext, useMemo } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { IMessage } from '~/types/message';
import Avatar from '../Common/Avatar';
import { motion } from 'framer-motion';
import OptionIcon from '../Icons/OptionIcon';
import PencilSquareIcon from '../Icons/PencilSquareIcon';

const Message: FC<IMessage> = ({ sender, text, createdAt }) => {
  const { currentUser } = useContext(AppContext);
  const own = useMemo(() => sender._id === currentUser?._id, [currentUser?._id, sender._id]);

  return (
    <li
      className={`flex items-start group gap-1.5 max-w-[80%] mb-3.5 ${
        own ? 'ml-auto' : 'justify-start'
      }`}
    >
      {!own && <Avatar size='medium' url={sender.avatar}></Avatar>}
      <motion.div
        className={`flex opacity-0 invisible transition-all items-center self-center gap-1 group-hover:opacity-100 group-hover:visible ${
          !own ? 'order-3 flex-row-reverse' : ''
        }`}
      >
        <button>
          <PencilSquareIcon width='20' height='20'></PencilSquareIcon>
        </button>
        <button>
          <OptionIcon></OptionIcon>
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='px-2 bg-white rounded-md py-1 min-w-[100px]'
      >
        {!own && <div className='font-medium text-bluePrimary/60'>{sender.username}</div>}
        <p className='text-sm'>{text}</p>
        <div className='flex-shrink-0 mt-0.5 text-xs text-gray-400'>
          {moment(createdAt).format('LT').split(' ')[0]}
        </div>
      </motion.div>
    </li>
  );
};

export default Message;
