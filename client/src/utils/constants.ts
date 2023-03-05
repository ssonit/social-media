import { IUser, IUserShort } from '~/types/user';
import { storage } from './storage';

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/v1/';

export const URL_CLIENT = import.meta.env.VITE_URL_CLIENT || 'http://localhost:3000';

export const getPathImage = (path: string) =>
  path && path.includes('http') ? path : `https://res.cloudinary.com/${path}`;

export const pathRoute = {
  home: '/',
  profile: '/profile/:userId',
  editProfile: '/accounts/edit',
  login: '/login',
  register: '/register',
  forgotten_password: '/forgotten-password',
  detail_post: '/post',
  explore: '/explore',
  messages: '/messages',
} as const;

export const storageKey = {
  login: 'logged_in',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: 'user',
} as const;

export const setAccessTokenStorage = (accessToken: string) => {
  storage.set(storageKey.accessToken, accessToken);
};

export const handleSetSize = (size: string) => {
  switch (size) {
    case 'super':
      return 'w-[77px] h-[77px]';
    case 'big':
      return 'w-14 h-14';
    case 'large':
      return 'w-11 h-11';
    case 'medium':
      return 'w-8 h-8';
    case 'small':
      return 'w-6 h-6';
    default:
      return 'w-6 h-6';
  }
};

export const avatarUrl =
  'https://res.cloudinary.com/dyq35jdkl/image/upload/v1670470288/instagram-clone/avatar_dndzkl.jpg' ||
  'https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-deo-kinh-1.jpg';

export const ModalType = {
  POST_CREATOR: 'POST_CREATOR',
  POST_UPDATE: 'POST_UPDATE',
  POST_COMMENT: 'POST_COMMENT',
  FOLLOWERS_USER: 'FOLLOWERS_USER',
  FOLLOWINGS_USER: 'FOLLOWINGS_USER',
  CONFIRM_MODAL: 'CONFIRM_MODAL',
} as const;

export const resizeImage = (url: string, width = '', height = '') =>
  url.startsWith('https://graph.facebook.com/')
    ? url
    : `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`;

export const uploadKey = {
  IMAGE: 'image',
  IMAGES: 'images',
} as const;

export function AddData(data: IUserShort[], user: IUser) {
  return [
    ...data,
    {
      _id: user._id,
      avatar: user.avatar,
      fullname: user.fullname,
      username: user.username,
    },
  ];
}

export function RemoveData(data: IUserShort[], user: IUser) {
  return data.filter((item) => item._id !== user._id);
}
