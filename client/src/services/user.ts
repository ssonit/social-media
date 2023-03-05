import { IUser, IUserEdit, IUserSearchResponse } from './../types/user';
import { IUserResponse } from '~/types/user';
import http from '~/utils/instance';
import { ResponseApi } from '~/types/utils';

const url = 'user';

const userApi = {
  getUser: (id: string) => http.get<IUserResponse>(`${url}/${id}`),
  updateUser: (userData: IUserEdit) => http.put<IUserResponse>(`${url}/`, userData),
  searchUser: (username: string) =>
    http.get<IUserSearchResponse>(`${url}/search`, {
      params: {
        username,
      },
    }),
  followUser: (id: string) => http.put(`${url}/${id}/follow`),
  unFollowUser: (id: string) => http.put(`${url}/${id}/unfollow`),
  getSuggestionsUser: (id: string) => http.get<ResponseApi<IUser[]>>(`${url}/${id}/suggestion`),
};

export default userApi;
