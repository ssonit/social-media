import { useInfiniteQuery } from '@tanstack/react-query';
import React, { FC, useContext, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ConversationContext } from '~/contexts/ConversationContext';
import messageApi from '~/services/message';
import Spinner from '../Common/Spinner';
import Message from './Message';
import { motion } from 'framer-motion';

interface IProps {
  conversationId: string;
}

const LIMIT = 8;

const MessageList: FC<IProps> = ({ conversationId }) => {
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const { messages, setMessages } = useContext(ConversationContext);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['messages', conversationId],
    queryFn: ({ pageParam = 1 }) => messageApi.getMessages(conversationId, pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.data.length >= LIMIT) {
        const nextPage = allPages.length + 1;
        return nextPage;
      }
      return undefined;
    },
    enabled: !!conversationId,
  });

  console.log(data?.pages.flat(), 'pages');

  useEffect(() => {
    if ((data?.pages.length as number) > 0) {
      setMessages((prev) => {
        const page = data?.pages[data.pages.length - 1].data.data;
        if (page) return [...page.reverse(), ...prev];
        return [...prev];
      });
    }
  }, [data?.pages, setMessages]);

  const scrollToBottom = () => {
    messageEndRef.current &&
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {isFetchingNextPage && (
        <motion.div className='flex items-center justify-center mt-2'>
          <Spinner></Spinner>
        </motion.div>
      )}
      <ul
        id='scrollableDiv'
        className='px-3 py-6 mt-2 scrollbar-hide'
        style={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
          scrollBehavior: 'smooth',
        }}
      >
        <InfiniteScroll
          dataLength={data?.pages.flatMap((p) => p.data).length || 0}
          next={() => fetchNextPage()}
          hasMore={(hasNextPage as boolean) || false}
          loader={<div className='flex items-center justify-center my-4'></div>}
          className='flex flex-col scrollbar-hide'
          scrollableTarget='scrollableDiv'
          inverse={true}
        >
          {messages?.map((item, index) => (
            <Message key={index} {...item}></Message>
          ))}
        </InfiniteScroll>
      </ul>
      <div ref={messageEndRef}></div>
    </>
  );
};

export default MessageList;
