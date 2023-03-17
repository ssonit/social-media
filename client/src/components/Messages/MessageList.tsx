import { useInfiniteQuery } from '@tanstack/react-query';
import React, { FC, useContext, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ConversationContext } from '~/contexts/ConversationContext';
import messageApi from '~/services/message';
import Message from './Message';
import { AnimatePresence } from 'framer-motion';

interface IProps {
  conversationId: string;
}

const LIMIT = 8;

const MessageList: FC<IProps> = ({ conversationId }) => {
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const { messages, setMessages } = useContext(ConversationContext);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
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

  console.log(data?.pages, 'pages');
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
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div
        id='scrollableDiv'
        className='px-3 py-4 mt-2 overflow-y-auto'
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          scrollBehavior: 'smooth',
          height: '100%',
        }}
      >
        <InfiniteScroll
          dataLength={data?.pages.flatMap((p) => p.data).length || 0}
          next={() => fetchNextPage()}
          hasMore={(hasNextPage as boolean) || false}
          loader={<div className='flex items-center justify-center my-1'></div>}
          className='flex flex-col overflow-x-hidden scrollbar-hide'
          scrollableTarget='scrollableDiv'
          inverse={true}
        >
          <AnimatePresence>
            {messages?.map((item, index) => (
              <Message key={index} {...item}></Message>
            ))}
          </AnimatePresence>
        </InfiniteScroll>
      </div>
      <div ref={messageEndRef}></div>
    </>
  );
};

export default MessageList;
