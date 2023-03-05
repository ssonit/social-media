import { useQuery } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import FeedItem from '~/components/Common/FeedItem';
import { AppContext } from '~/contexts/AppContext';
import MainLayout from '~/layouts/MainLayout';
import postApi from '~/services/post';

const Explore: FC = () => {
  const { currentUser } = useContext(AppContext);
  const userId = currentUser?._id as string;
  const { data } = useQuery({
    queryKey: ['posts_explore', userId],
    queryFn: () => postApi.getPostsExplore(userId),
    enabled: !!userId,
  });
  return (
    <MainLayout>
      {data && data?.data.data.length > 0 ? (
        <div className='grid grid-cols-2 gap-1 md:grid-cols-4'>
          {data?.data.data.map((item) => (
            <FeedItem {...item} key={item._id}></FeedItem>
          ))}
        </div>
      ) : (
        <div className='mt-5 text-center'>Explore</div>
      )}
    </MainLayout>
  );
};

export default Explore;
