import { IUserShort } from './user';
import { ResponseApi } from './utils';

export interface IConversationMessage {
  createdAt: string;
  members: string[];
  name: string;
  updatedAt: string;
  _id: string;
}

export interface IConversation {
  members: IUserShort[];
  name: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  latestMessage: {
    text: string;
    createdAt: string;
  };
}

export type IConversationMessageResponse = ResponseApi<IConversation>;
export type IConversationResponse = ResponseApi<IConversation[]>;
