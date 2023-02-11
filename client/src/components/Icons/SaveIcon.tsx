import { FC } from 'react';
import { IPropsIcon } from '~/types/global';

const SaveIcon: FC<IPropsIcon> = ({
  color = '#262626',
  colorFill = 'none',
  className = 'w-6 h-6',
}) => {
  return (
    <svg
      aria-label='Lưu'
      className={`_ab6- ${className}`}
      color={color}
      fill={color}
      role='img'
      viewBox='0 0 24 24'
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
