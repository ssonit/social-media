import { storage } from './storage';

export const getPathImage = (path: string) =>
  path.includes('http') ? path : `https://res.cloudinary.com/${path}`;

export const pathRoute = {
  home: '/',
  profile: '/profile/:userId',
  editProfile: '/accounts/edit',
  login: '/login',
  register: '/register',
  forgotten_password: '/forgotten-password',
} as const;

export const storageKey = {
  login: 'logged_in',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
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
  'https://res.cloudinary.com/dyq35jdkl/image/upload/v1670470288/instagram-clone/avatar_dndzkl.jpg';

export const ModalType = {
  POST_CREATOR: 'POST_CREATOR',
  POST_COMMENT: 'POST_COMMENT',
  FOLLOWERS_USER: 'FOLLOWERS_USER',
  FOLLOWINGS_USER: 'FOLLOWINGS_USER',
} as const;
