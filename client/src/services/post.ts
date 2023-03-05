import { IPost, IPostGenerate, IPostGenerateResponse } from '~/types/post';
import { ResponseApi } from '~/types/utils';
import http from '~/utils/instance';

const url = 'post';

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

  deletePost: (postId: string) => http.delete(`${url}/${postId}`),

  likePost: (postId: string) => http.patch(`${url}/${postId}/like`),
  unLikePost: (postId: string) => http.patch(`${url}/${postId}/unlike`),

  getPostsUser: (userId: string, page = 1, limit = LIMIT) =>
    http.get<IPostGenerateResponse>(`${url}/${userId}/user?page=${page}&limit=${limit}`),

  getPostsSaved: (userId: string) => http.get<ResponseApi<IPost[]>>(`${url}/${userId}/saved`),

  getPostsExplore: (userId: string) => http.get<ResponseApi<IPost[]>>(`${url}/${userId}/explore`),

  savePost: (postId: string) => http.patch<ResponseApi<string[]>>(`${url}/${postId}/saved`),
};

export default postApi;
