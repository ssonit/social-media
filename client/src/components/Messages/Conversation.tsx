import { useQuery } from '@tanstack/react-query';
import React, { FC, useContext, useEffect } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { ConversationContext } from '~/contexts/ConversationContext';
import conversationApi from '~/services/conversation';
import ConversationInfo from './ConversationInfo';

const Conversation: FC = () => {
  const { currentUser } = useContext(AppContext);
  const {
    setCurrentChat,
    conversations,
    setConversations,
    setMessages,
    currentChat,
    setLocalMessages,
  } = useContext(ConversationContext);

  const userId = currentUser ? currentUser._id : '';

  const { data } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => conversationApi.getConversations(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.status === 200) {
      setCurrentChat(data.data.data[0]);
      setConversations(data?.data.data);
    }
  }, [data, setConversations, setCurrentChat]);

  return (
    <ul className='flex flex-col gap-1 pb-2'>
      {conversations &&
        conversations
          .sort(
            (a, b) =>
              new Date(b.latestMessage.createdAt).getTime() -
              new Date(a.latestMessage.createdAt).getTime(),
          )
          .map((conversation) => {
            return (
              <li key={conversation._id}>
                <button
                  onClick={() => {
                    if (currentChat?._id !== conversation._id) {
                      setCurrentChat(conversation);
                    }
                    setMessages([]);
                    setLocalMessages([]);
                  }}
                  className='flex items-center justify-between w-full px-3 py-4 transition-all bg-gray-200 rounded-lg'
                >
                  <ConversationInfo
                    members={conversation.members}
                    name={conversation.name}
                    latestMessage={conversation.latestMessage.text}
                  ></ConversationInfo>
                  <div className='shrink-0'>
                    <div className='inline-block w-2 h-2 bg-gray-400 rounded-full'></div>
                  </div>
                </button>
              </li>
            );
          })}
    </ul>
  );
};

export default Conversation;
