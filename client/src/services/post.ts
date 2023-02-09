import { IPostGenerateResponse } from '~/types/post';
import http from '~/utils/instance';

const url = '/v1/post';

const postApi = {
  getPostList: () => http.get<IPostGenerateResponse>(`${url}/`),
};

export default postApi;
