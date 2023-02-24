import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IPostGenerate } from '~/types/post';
import { getPathImage } from '~/utils/constants';
import CommentIcon from '../Icons/CommentIcon';
import ExplorePostIcon from '../Icons/ExplorePostIcon';
import HeartIcon from '../Icons/HeartIcon';

const FeedItem: FC<IPostGenerate> = (props) => {
  const { comments, likes, images, _id } = props;
  return (
    <Link to={`/post?id=${_id}`} className='relative cursor-pointer aspect-square group'>
      <div className='w-full h-full'>
        <img
          src={getPathImage(images[0])}
          alt='explore-img'
          className='object-cover w-full h-full select-none'
        />
      </div>
      <div className='absolute top-1 right-1'>
        <ExplorePostIcon></ExplorePostIcon>
      </div>
      <div className='absolute inset-0 invisible transition-all opacity-0 bg-graySecondary/30 group-hover:opacity-100 group-hover:visible'>
        <ul className='flex items-center justify-center w-full h-full gap-4 text-white'>
          <li className='flex items-center gap-1'>
            <HeartIcon width='20' height='20' color='#ffffff'></HeartIcon>
            <span className='select-none'>{likes.length}</span>
          </li>
          <li className='flex items-center gap-1'>
            <CommentIcon width='20' height='20' color='#ffffff'></CommentIcon>
            <span className='select-none'>{comments.length}</span>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default FeedItem;
