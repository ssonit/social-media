import { IUser } from './user';
import { ResponseApi } from './utils';

export type IAuthResponse = ResponseApi<{
  accessToken: string;
  user: IUser;
}>;

export type IAuthRefresh = ResponseApi<{
  accessToken: string;
}>;
