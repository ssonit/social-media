import { IConversationResponse } from '~/types/conversation';
import http from '~/utils/instance';

const url = 'conversation';

const conversationApi = {
  createConversation: (members: string[], name: string) =>
    http.post(`${url}/`, {
      name,
      members,
    }),

  getConversations: (userId: string) => http.get<IConversationResponse>(`${url}/${userId}`),
};

export default conversationApi;
