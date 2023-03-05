import React, { FC, useEffect, useRef, useState } from 'react';
import SearchIcon from '~/components/Icons/SearchIcon';
import Conversation from '~/components/Messages/Conversation';
import ConversationInfo from '~/components/Messages/ConversationInfo';
import MainLayout from '~/layouts/MainLayout';
import VideoIcon from '~/components/Icons/VideoIcon';
import PhoneIcon from '~/components/Icons/PhoneIcon';
import EllipsisCircleIcon from '~/components/Icons/EllipsisCircleIcon';
import Message from '~/components/Messages/Message';
import FormMessage from '~/components/Messages/FormMessage';

const Messages: FC = () => {
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {
      message: 'hello',
      own: false,
    },
    {
      message: 'hello',
      own: true,
    },
    {
      message: 'Lorem Ipsum Lorem Ipsum',
      own: false,
    },
  ]);

  const scrollToBottom = () => {
    messageEndRef.current && messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <MainLayout>
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <div className='flex flex-col max-h-screen'>
            <div className='flex items-center justify-between w-full px-3 py-6 bg-white'>
              <h2 className='text-3xl font-semibold text-bluePrimary'>Messages</h2>
              <button type='button' className='p-2 rounded-full bg-grayPrimary'>
                <SearchIcon width='16' height='16' color='#8e8e8e'></SearchIcon>
              </button>
            </div>
            <div className='mx-1 overflow-y-scroll scrollbar-hide'>
              <Conversation></Conversation>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='relative flex flex-col h-full max-h-screen'>
            <div className='flex items-center justify-between px-3 py-5'>
              <ConversationInfo></ConversationInfo>
              <div className='flex items-center gap-3'>
                <button>
                  <VideoIcon width='20' height='20' color='#8e8e8e'></VideoIcon>
                </button>
                <button>
                  <PhoneIcon width='20' height='20' color='#8e8e8e'></PhoneIcon>
                </button>
                <button>
                  <EllipsisCircleIcon width='20' height='20' color='#8e8e8e'></EllipsisCircleIcon>
                </button>
              </div>
            </div>
            <div className='flex-1 overflow-y-scroll rounded-t-lg mb-11 bg-gray-200/50 scrollbar-hide'>
              <ul className='flex flex-col gap-3.5 px-3 py-6'>
                {messages.map((item, index) => (
                  <Message key={index} content={item.message} own={item.own}></Message>
                ))}
              </ul>
              <div ref={messageEndRef}></div>
            </div>
            <div className='absolute bottom-0 w-full'>
              <FormMessage setMessages={setMessages}></FormMessage>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
