import { ResponseApi } from './utils';

export type IUploadImageResponse = ResponseApi<{
  path: string;
}>;

export type IUploadImagesResponse = ResponseApi<string[]>;
