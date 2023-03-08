import { createContext, useState } from 'react';
import { IConversation } from '~/types/conversation';
import { IMessage } from '~/types/message';

interface ConversationContextInterface {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
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
}

const initialConversationContext: ConversationContextInterface = {
  messages: [],
  setMessages: () => null,
  currentChat: null,
  setCurrentChat: () => null,
  onlineUsers: [],
  setOnlineUsers: () => null,
};

export const ConversationContext = createContext<ConversationContextInterface>(
  initialConversationContext,
);

export const ConversationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState(initialConversationContext.messages);
  const [currentChat, setCurrentChat] = useState(initialConversationContext.currentChat);
  const [onlineUsers, setOnlineUsers] = useState(initialConversationContext.onlineUsers);
  return (
    <ConversationContext.Provider
      value={{ messages, setMessages, currentChat, setCurrentChat, onlineUsers, setOnlineUsers }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
