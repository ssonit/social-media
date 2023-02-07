import { ResponseApi } from './utils';
import { IPostGenerate } from './post';

export interface IUser {
  address: string;
  avatar: string;
  email: string;
  followers: IUserShort[];
  followings: IUserShort[];
  fullname: string;
  gender: IGender;
  mobile: string;
  password: string;
  role: IRole;
  story: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  website: string;
  _id: string;
  saved: IPostGenerate[];
  posts: IPostGenerate[];
}

export type IUserResponse = ResponseApi<IUser>;

export type IUserSearchResponse = ResponseApi<IUserShort[]>;

export type IUserEdit = Pick<
  IUser,
  'avatar' | 'fullname' | 'username' | 'mobile' | 'gender' | 'story' | 'website' | 'address'
>;

export type IUserShort = Pick<IUser, '_id' | 'fullname' | 'username' | 'avatar'>;

type IRole = 'user' | 'admin';

type IGender = 'male' | 'female';
