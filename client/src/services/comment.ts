import { ICommentCreate } from '~/types/post';
import http from '~/utils/instance';

const url = '/v1/comment';

const commentApi = {
  createComment: ({ postId, content, reply, tag, postUserId }: ICommentCreate) =>
    http.post(`${url}/create`, {
      postId,
      content,
      reply,
      tag,
      postUserId,
    }),

  updateComment: ({ content, commentId }: { content: string; commentId: string }) =>
    http.put(`${url}/${commentId}/update`, {
      content,
    }),

  likeComment: (commentId: string) => http.patch(`${url}/${commentId}/like`),

  unlikeComment: (commentId: string) => http.patch(`${url}/${commentId}/unlike`),

  deleteManyComments: (commentsListId: string[]) =>
    http.delete(`${url}/delete`, { data: commentsListId }),
};

export default commentApi;
