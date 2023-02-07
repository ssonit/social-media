import { FC } from 'react';
import ExplorePostIcon from '../Icons/ExplorePostIcon';

const FeedItem: FC = () => {
  return (
    <div className='relative aspect-square'>
      <div className='w-full h-full'>
        <img
          src='https://vaithuhayho.com/wp-content/uploads/2022/09/anh-gai-xinh-deo-kinh-35.jpg'
          alt='explore-img'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='absolute top-1 right-1'>
        <ExplorePostIcon></ExplorePostIcon>
      </div>
    </div>
  );
};

export default FeedItem;
