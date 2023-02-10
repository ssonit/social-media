import React, { FC } from 'react';
import { useSwiper } from 'swiper/react';
import ChevronLeft from '../Icons/ChevronLeft';
import ChevronRight from '../Icons/ChevronRight';

const SlideButton: FC = () => {
  const swiper = useSwiper();
  return (
    <>
      <button
        onClick={() => swiper.slidePrev()}
        className='absolute z-10 p-1.5 text-white rounded-full top-1/2 -translate-y-1/2 left-2 bg-graySecondary'
      >
        <ChevronLeft></ChevronLeft>
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className='absolute z-10 p-1.5 text-white rounded-full top-1/2 -translate-y-1/2 right-2 bg-graySecondary'
      >
        <ChevronRight></ChevronRight>
      </button>
    </>
  );
};

export default SlideButton;
