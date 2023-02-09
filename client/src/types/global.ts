import { IUser } from './user';

export interface IColorIcon {
  color?: '#262626' | '#8e8e8e' | '#0095f6' | '#ed4956' | '#ffffff';
}

export type IPropsIcon = {
  width?: string;
  height?: string;
  colorFill?: '#262626' | '#8e8e8e' | '#0095f6' | '#ed4956' | '#ffffff' | 'none';
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
  userData?: IUser;
}
