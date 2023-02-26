import React, { FC } from 'react';
import { IPost, IPostGenerate } from '~/types/post';
import FeedItem from '../Common/FeedItem';

interface IProps {
  data?: IPostGenerate[] | IPost[];
}

const PostGrid: FC<IProps> = ({ data }) => {
  return (
    <div className='min-h-[200px]'>
      {data ? (
        <div className='grid grid-flow-row grid-cols-2 gap-1 my-auto md:grid-cols-3 lg:grid-cols-4'>
          {data.map((item) => (
            <FeedItem key={item._id} {...item}></FeedItem>
          ))}
        </div>
      ) : (
        <p className='py-24 text-lg font-semibold text-center'>You have not posted any posts yet</p>
      )}
    </div>
  );
};

export default PostGrid;
