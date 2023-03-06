import { IMessage } from '~/types/message';
import { ResponseApi } from '~/types/utils';
import http from '~/utils/instance';

const url = 'message';

const messageApi = {
  createMessage: ({
    conversationId,
    sender,
    text,
  }: {
    conversationId: string;
    sender: string;
    text: string;
  }) =>
    http.post<ResponseApi<IMessage>>(`${url}/`, {
      conversationId,
      sender,
      text,
    }),
  getMessages: (conversationId: string) =>
    http.get<ResponseApi<IMessage[]>>(`${url}/${conversationId}`),
};

export default messageApi;
