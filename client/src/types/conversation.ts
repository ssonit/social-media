import { IUserShort } from './user';
import { ResponseApi } from './utils';

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

export type IConversationResponse = ResponseApi<IConversation[]>;
