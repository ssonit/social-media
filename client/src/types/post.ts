import { ResponseApi } from './utils';
import { IUserShort } from './user';

export interface IPost {
  comments: string[];
  createdAt: string;
  description: string;
  images: string[];
  likes: string[];
  updatedAt: string;
  userId: string;
  _id: string;
}

export interface IPostGenerate {
  comments: [];
  createdAt: string;
  description: string;
  images: string[];
  likes: IUserShort[];
  updatedAt: string;
  userId: IUserShort;
  _id: string;
}

export type IPostResponse = ResponseApi<IPost[]>;

export type IPostGenerateResponse = ResponseApi<IPostGenerate[]>;
