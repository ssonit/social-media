import { IPostGenerate, IPostGenerateResponse } from '~/types/post';
import { ResponseApi } from '~/types/utils';
import http from '~/utils/instance';

const url = '/v1/post';

const LIMIT = 10;

const postApi = {
  getPostList: (page = 1, limit = LIMIT) =>
    http.get<IPostGenerateResponse>(`${url}/?page=${page}&limit=${limit}`),

  getPost: (postId: string) => http.get<ResponseApi<IPostGenerate>>(`${url}/${postId}`),

  createPost: (description: string, images: string[]) =>
    http.post(`${url}/`, {
      description,
      images,
    }),

  updatePost: (description: string, images: string[], postId: string) =>
    http.put(`${url}/${postId}`, {
      description,
      images,
    }),

  likePost: (postId: string) => http.patch(`${url}/${postId}/like`),
  unLikePost: (postId: string) => http.patch(`${url}/${postId}/unlike`),
};

export default postApi;
