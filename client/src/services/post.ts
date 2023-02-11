import { IPostGenerateResponse } from '~/types/post';
import http from '~/utils/instance';

const url = '/v1/post';

const LIMIT = 10;

const postApi = {
  getPostList: (page = 1, limit = LIMIT) =>
    http.get<IPostGenerateResponse>(`${url}/?page=${page}&limit=${limit}`),

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
};

export default postApi;
