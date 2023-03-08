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
  getMessages: (conversationId: string) =>
    http.get<ResponseApi<IMessage[]>>(`${url}/${conversationId}`),
};

export default messageApi;
