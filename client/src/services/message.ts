import { IMessage } from '~/types/message';
import { ResponseApi } from '~/types/utils';
import http from '~/utils/instance';

const url = 'message';

const messageApi = {
  createMessage: ({
    conversationId,
    senderId,
    text,
  }: {
    conversationId: string;
    senderId: string;
    text: string;
  }) =>
    http.post<ResponseApi<IMessage>>(`${url}/`, {
      conversationId,
      sender: senderId,
      text,
    }),
  getMessages: (conversationId: string, page = 1, limit = 10) =>
    http.get<ResponseApi<IMessage[]>>(`${url}/${conversationId}?page=${page}&limit=${limit}`),

  deleteMessage: (messageId: string) => http.delete(`${url}/${messageId}`),
};

export default messageApi;
