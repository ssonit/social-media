import { ResponseApi } from './utils';
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
  likes: [];
  updatedAt: string;
  userId: { _id: string; fullname: string; username: string; avatar: string };
  _id: string;
}

export type IPostResponse = ResponseApi<IPost[]>;

export type IPostGenerateResponse = ResponseApi<IPostGenerate[]>;
