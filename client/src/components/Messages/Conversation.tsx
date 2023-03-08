import { useQuery } from '@tanstack/react-query';
import React, { FC, useContext, useEffect } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { ConversationContext } from '~/contexts/ConversationContext';
import conversationApi from '~/services/conversation';
import ConversationInfo from './ConversationInfo';

const Conversation: FC = () => {
  const { currentUser } = useContext(AppContext);
  const { setCurrentChat } = useContext(ConversationContext);

  const userId = currentUser ? currentUser._id : '';
  const { data } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => conversationApi.getConversations(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    data?.status === 200 && setCurrentChat(data.data.data[0]);
  }, [data, setCurrentChat]);

  return (
    <ul className='flex flex-col gap-1 pb-2'>
      {data &&
        data.data.data.map((conversation) => {
          return (
            <li key={conversation._id}>
              <button
                onClick={() => {
                  setCurrentChat(conversation);
                }}
                className='flex items-center justify-between w-full px-3 py-4 transition-all bg-gray-200 rounded-lg'
              >
                <ConversationInfo
                  members={conversation.members}
                  name={conversation.name}
                ></ConversationInfo>
                <div className='shrink-0'>
                  <div className='inline-block w-3 h-3 rounded-full bg-bluePrimary'></div>
                </div>
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default Conversation;
