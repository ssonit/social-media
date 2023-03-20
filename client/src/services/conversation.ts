import { IConversationMessageResponse, IConversationResponse } from '~/types/conversation';
import http from '~/utils/instance';

const url = 'conversation';

const conversationApi = {
  createConversation: (members: string[], name: string) =>
    http.post<IConversationMessageResponse>(`${url}/`, {
      name,
      members,
    }),
  createMultiConversation: ({
    users,
    currentUserId,
  }: {
    users: { id: string; name: string }[];
    currentUserId: string;
  }) =>
    http.post(`${url}/create`, {
      users,
      currentUserId,
    }),
  getConversations: (userId: string) => http.get<IConversationResponse>(`${url}/${userId}`),
};

export default conversationApi;
