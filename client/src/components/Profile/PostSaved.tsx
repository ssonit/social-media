import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import postApi from '~/services/post';
import PostGrid from './PostGrid';

interface IProps {
  userId: string;
}
const PostSaved: FC<IProps> = ({ userId }) => {
  const { data } = useQuery({
    queryKey: ['post_saved', userId],
    queryFn: () => postApi.getPostsSaved(userId),
    enabled: !!userId,
  });
  return <PostGrid data={data?.data.data}></PostGrid>;
};

export default PostSaved;
