import { FC } from 'react';
import { IPropsIcon } from '~/types/global';

const CloseIcon: FC<IPropsIcon> = ({ color = '#ffffff', width = '18', height = '18' }) => {
  return (
    <svg
      aria-label='Đóng'
      className='x1lliihq x1n2onr6'
      color={color}
      fill={color}
      height={height}
      role='img'
      viewBox='0 0 24 24'
      width={width}
    >
      <title>Đóng</title>
      <polyline
        fill='none'
        points='20.643 3.357 12 12 3.353 20.647'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'
      ></polyline>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'
        x1='20.649'
        x2='3.354'
        y1='20.649'
        y2='3.354'
      ></line>
    </svg>
  );
};

export default CloseIcon;
