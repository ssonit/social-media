import { createContext, useState } from 'react';
import { IConversation } from '~/types/conversation';
import { IMessage } from '~/types/message';

interface ConversationContextInterface {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  currentChat: IConversation | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<IConversation | null>>;
}

const initialConversationContext: ConversationContextInterface = {
  messages: [],
  setMessages: () => null,
  currentChat: null,
  setCurrentChat: () => null,
};

export const ConversationContext = createContext<ConversationContextInterface>(
  initialConversationContext,
);

export const ConversationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState(initialConversationContext.messages);
  const [currentChat, setCurrentChat] = useState(initialConversationContext.currentChat);
  return (
    <ConversationContext.Provider value={{ messages, setMessages, currentChat, setCurrentChat }}>
      {children}
    </ConversationContext.Provider>
  );
};
