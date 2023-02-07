import { IAuthRefresh, IAuthResponse } from '~/types/auth';
import http from '~/utils/instance';
import { LoginSchema, RegisterSchema } from '~/utils/rules';

const url = '/v1/auth';

const authApi = {
  loginUser: ({ email, password }: LoginSchema) =>
    http.post<IAuthResponse>(`${url}/login`, { email, password }),

  registerUser: ({ email, password, fullname, username }: RegisterSchema) =>
    http.post<IAuthResponse>(`${url}/register`, { email, password, fullname, username }),

  refreshToken: (options?: { signal: AbortSignal }) =>
    http.post<IAuthRefresh>(`${url}/refreshToken`, options),

  logoutUser: () => http.post(`${url}/logout`),

  reload: (options?: { signal: AbortSignal }) => http.post<IAuthResponse>(`${url}/reload`, options),
};

export default authApi;
