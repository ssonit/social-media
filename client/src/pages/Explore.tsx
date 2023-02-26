import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import postApi from '~/services/post';

const Explore: FC = () => {
  const { data } = useQuery({
    queryKey: ['posts_explore'],
    queryFn: () => postApi.getPostsExplore(),
  });
  console.log(data);
  return <div></div>;
};

export default Explore;
