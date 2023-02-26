import { IPostGenerate } from './post';
import { IUser } from './user';

export interface IColorIcon {
  color?: '#262626' | '#8e8e8e' | '#0095f6' | '#ed4956' | '#ffffff' | '#A78BFA';
}

export type IPropsIcon = {
  width?: string;
  height?: string;
  colorFill?: '#262626' | '#8e8e8e' | '#0095f6' | '#ed4956' | '#ffffff' | '#A78BFA' | 'none';
  className?: string;
} & IColorIcon;

export interface IFormError {
  msg: string;
}

export interface IFormGroupEdit {
  label: string;
  value: string;
  id: string;
  name: string;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export interface IPropsModal {
  openModal: boolean;
  handleCloseModal: () => void;
  children?: React.ReactNode;
  userData?: IUser;
  postData?: IPostGenerate;
}
