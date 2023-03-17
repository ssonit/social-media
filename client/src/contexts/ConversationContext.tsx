import { createContext, useContext, useEffect, useState } from 'react';
import { IConversation } from '~/types/conversation';
import { IMessage } from '~/types/message';
import { AppContext } from './AppContext';

interface ConversationContextInterface {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  localMessages: IMessage[];
  setLocalMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  currentChat: IConversation | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<IConversation | null>>;
  onlineUsers: { socketId: string; userId: string }[];
  setOnlineUsers: React.Dispatch<
    React.SetStateAction<
      {
        socketId: string;
        userId: string;
      }[]
    >
  >;
  conversations: IConversation[];
  setConversations: React.Dispatch<React.SetStateAction<IConversation[]>>;
}

const initialConversationContext: ConversationContextInterface = {
  messages: [],
  setMessages: () => null,
  localMessages: [],
  setLocalMessages: () => null,
  currentChat: null,
  setCurrentChat: () => null,
  onlineUsers: [],
  setOnlineUsers: () => null,
  conversations: [],
  setConversations: () => null,
};

export const ConversationContext = createContext<ConversationContextInterface>(
  initialConversationContext,
);

export const ConversationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState(initialConversationContext.messages);
  const [localMessages, setLocalMessages] = useState(initialConversationContext.localMessages);
  const [currentChat, setCurrentChat] = useState(initialConversationContext.currentChat);
  const [onlineUsers, setOnlineUsers] = useState(initialConversationContext.onlineUsers);
  const [conversations, setConversations] = useState(initialConversationContext.conversations);

  const { currentUser, socket } = useContext(AppContext);

  useEffect(() => {
    if (currentUser) {
      socket?.emit('onlineUser', { userId: currentUser?._id });
      socket?.on('getUsers', (data) => {
        setOnlineUsers(data);
      });
    }
    return () => {
      socket?.disconnect();
    };
  }, [currentUser, socket]);

  return (
    <ConversationContext.Provider
      value={{
        messages,
        setMessages,
        localMessages,
        setLocalMessages,
        currentChat,
        setCurrentChat,
        onlineUsers,
        setOnlineUsers,
        conversations,
        setConversations,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
