import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import postApi from '~/services/post';
import PostGrid from './PostGrid';

interface IProps {
  userId: string;
  model?: 'grid' | 'list';
}

const PostsUser: FC<IProps> = ({ userId, model = 'grid' }) => {
  const { data } = useQuery({
    queryKey: ['post_user', userId],
    queryFn: () => postApi.getPostsUser(userId),
    enabled: !!userId,
  });
  console.log(data);

  return <>{model === 'grid' && <PostGrid data={data?.data.data}></PostGrid>}</>;
};

export default PostsUser;
