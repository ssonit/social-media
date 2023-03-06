import { IUserShort } from './user';

export interface IMessage {
  conversationId: string;
  text: string;
  sender: IUserShort;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
