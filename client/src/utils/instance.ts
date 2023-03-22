import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { BASE_URL, storageKey } from './constants';
import { cookie, storage } from './storage';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { IAuthResponse } from '~/types/auth';
import authApi from '~/services/auth';

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken =
      cookie.get(storageKey.accessToken) || storage.get(storageKey.accessToken) || '';
    this.instance = axios.create({
      baseURL: BASE_URL + '/v1/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    this.instance.interceptors.request.use(
      async (config) => {
        const accessToken = this.accessToken !== '' && this.accessToken;
        const date = new Date();
        if (accessToken) {
          const decodedToken = jwt_decode<JwtPayload>(accessToken);
          if (decodedToken.exp && config.headers) {
            if (decodedToken.exp * 1000 < date.getTime() && config.url !== 'auth/refreshToken') {
              const data = await authApi.refreshToken();
              cookie.set(storageKey.accessToken, data.data.data.accessToken);
              storage.set(storageKey.accessToken, data.data.data.accessToken);
              this.accessToken = data.data.data.accessToken;

              (config?.headers as AxiosRequestHeaders)[
                'Authorization'
              ] = `Bearer ${data.data.data.accessToken}`;
            } else {
              (config?.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${accessToken}`;
            }
          }
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === 'auth/login' || url === 'auth/register') {
          const data = response.data as IAuthResponse;
          this.accessToken = data.data.accessToken;
          cookie.set(storageKey.accessToken, data.data.accessToken);
          storage.set(storageKey.accessToken, data.data.accessToken);
        } else if (url === 'auth/logout') {
          this.accessToken = '';
          cookie.remove(storageKey.accessToken);
          storage.remove(storageKey.accessToken);
        }
        return response;
      },
      (err) => Promise.reject(err),
    );
  }
}

const http = new Http().instance;

export default http;
