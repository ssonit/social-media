import { FC } from 'react';
import { IPropsIcon } from '~/types/global';

const SaveIcon: FC<IPropsIcon> = ({ color = '#262626', colorFill = 'none' }) => {
  return (
    <svg
      aria-label='Lưu'
      className='_ab6-'
      color={color}
      fill={color}
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
    >
      <polygon
        fill={colorFill}
        points='20 21 12 13.44 4 21 4 3 20 3 20 21'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      ></polygon>
    </svg>
  );
};

export default SaveIcon;
