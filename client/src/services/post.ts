import http from '~/utils/instance';

const url = '/v1/post';

const postApi = {
  getPostList: () => http.get(`${url}/`),
};

export default postApi;
