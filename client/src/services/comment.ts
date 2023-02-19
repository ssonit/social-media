import { ICommentCreate } from '~/types/post';
import http from '~/utils/instance';

const url = '/v1/comment';

const commentApi = {
  createComment: ({ postId, content, reply, tag }: ICommentCreate) =>
    http.post(`${url}/create`, {
      postId,
      content,
      reply,
      tag,
    }),

  updateComment: ({ content, commentId }: { content: string; commentId: string }) =>
    http.put(`${url}/${commentId}/update`, {
      content,
    }),
};

export default commentApi;
