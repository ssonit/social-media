import { useQuery } from '@tanstack/react-query';
import { FC, useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import postApi from '~/services/post';
import PostItem from './PostItem';

const PostList: FC = () => {
  const { isAuthenticated } = useContext(AppContext);
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postApi.getPostList(),
    enabled: !!isAuthenticated,
  });

  return (
    <section>
      {data?.data.data.map((item) => (
        <PostItem {...item} key={item._id}></PostItem>
      ))}
    </section>
  );
};

export default PostList;
