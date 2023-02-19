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

export interface IComment {
  _id: string;
  content: string;
  likes: IUserShort[];
  user: IUserShort;
  postId: string;
  postUserId: string;
  reply: string | undefined;
  tag: IUserShort | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface IPostGenerate {
  comments: IComment[];
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

export type ICommentCreate = Pick<IComment, 'postId' | 'content' | 'reply' | 'tag' | 'postUserId'>;
