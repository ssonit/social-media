import { FC } from 'react';
import { IPropsIcon } from '~/types/global';

const CommentIcon: FC<IPropsIcon> = ({ width = '24', height = '24', color = '#262626' }) => {
  return (
    <svg
      aria-label='Bình luận'
      className='_ab6-'
      color={color}
      fill={color}
      height={height}
      role='img'
      viewBox='0 0 24 24'
      width={width}
    >
      <path
        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
      ></path>
    </svg>
  );
};

export default CommentIcon;
