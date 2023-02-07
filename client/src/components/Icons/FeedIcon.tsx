import { FC } from 'react';
import { IColorIcon } from '~/types/global';

const FeedIcon: FC<IColorIcon> = ({ color = '#262626' }) => {
  return (
    <svg
      aria-label='Bảng feed'
      className='_ab6-'
      color={color}
      fill={color}
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <rect
        fill='none'
        height='10'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        width='12'
        x='6'
        y='7'
      ></rect>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        x1='6.002'
        x2='18'
        y1='3.004'
        y2='3.004'
      ></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        x1='6.002'
        x2='18'
        y1='21'
        y2='21'
      ></line>
    </svg>
  );
};

export default FeedIcon;
