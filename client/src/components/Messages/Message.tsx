import moment from 'moment';
import React, { FC, useContext, useMemo, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { IMessage } from '~/types/message';
import Avatar from '../Common/Avatar';
import { motion } from 'framer-motion';
import OptionIcon from '../Icons/OptionIcon';
import PencilSquareIcon from '../Icons/PencilSquareIcon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import messageApi from '~/services/message';
import { ConversationContext } from '~/contexts/ConversationContext';
import { toast } from 'react-toastify';

const Message: FC<IMessage> = ({ sender, text, createdAt, _id }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AppContext);
  const { messages, setMessages } = useContext(ConversationContext);
  const own = useMemo(() => sender._id === currentUser?._id, [currentUser?._id, sender._id]);

  const queryClient = useQueryClient();

  const deleteMessageMutation = useMutation({
    mutationFn: (body: string) => messageApi.deleteMessage(body),
  });

  const handleDeleteMessage = async () => {
    await deleteMessageMutation.mutateAsync(_id);
    const newMessages = messages.filter((m) => m._id !== _id);
    setMessages(newMessages);
    setOpen(false);
    queryClient.invalidateQueries(['conversations', currentUser?._id as string]);
    toast.success('Delete message success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`flex max-w-full group gap-1.5 mb-3.5 ${
        own ? 'flex-row-reverse ml-auto' : 'flex-row'
      }`}
    >
      {!own && <Avatar size='medium' url={sender.avatar}></Avatar>}
      <div
        className={`flex relative opacity-0 invisible transition-all items-center self-center gap-1 group-hover:opacity-100 group-hover:visible ${
          !own ? 'order-3' : 'order-2'
        }`}
      >
        <button onClick={() => setOpen(!open)}>
          <OptionIcon></OptionIcon>
        </button>
        <button>
          <PencilSquareIcon width='20' height='20'></PencilSquareIcon>
        </button>
        {open && (
          <motion.button
            onClick={handleDeleteMessage}
            className='absolute py-2 z-50 font-semibold text-sm rounded-md text-center translate-x-1/2 shadow-3xl bg-white hover:bg-gray-200 transition-all px-2 min-w-[140px] mb-2 right-3/4 bottom-full'
          >
            Remove message
          </motion.button>
        )}
      </div>
      <div className='px-2 transition-all ease-linear bg-white rounded-md py-1 min-w-[100px]'>
        {!own && <div className='font-medium text-bluePrimary/60'>{sender.username}</div>}
        <p className='text-sm'>{text}</p>
        <div className='flex-shrink-0 mt-0.5 text-xs text-gray-400'>
          {moment(createdAt).format('LT')}
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
