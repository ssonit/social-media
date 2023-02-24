import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import postApi from '~/services/post';
import FeedItem from '../Common/FeedItem';

interface IProps {
  userId: string;
}

const PostsUser: FC<IProps> = ({ userId }) => {
  const { data } = useQuery({
    queryKey: ['post_user', userId],
    queryFn: () => postApi.getPostsUser(userId),
    enabled: !!userId,
  });
  return (
    <div className='min-h-[200px]'>
      {data ? (
        <div className='grid grid-flow-row grid-cols-2 gap-1 my-auto md:grid-cols-3 lg:grid-cols-4'>
          {data?.data.data.map((item) => (
            <FeedItem key={item._id} {...item}></FeedItem>
          ))}
        </div>
      ) : (
        <p className='py-24 text-lg font-semibold text-center'>You have not posted any posts yet</p>
      )}
    </div>
  );
};

export default PostsUser;
