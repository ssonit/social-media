import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { avatarUrl, getPathImage } from '~/utils/constants';
import { Navigation } from 'swiper';
import SlideButton from './SlideButton';

interface IProps {
  images: string[];
}
const SlideImages: FC<IProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      className='flex items-center justify-center'
    >
      {images.length > 0 &&
        images.map((image, index) => (
          <SwiperSlide className='relative' key={index}>
            <div className='w-full h-[125%] md:h-full'>
              <img
                src={getPathImage(image) || avatarUrl}
                alt='post-img'
                className='object-cover w-full h-full select-none'
              />
            </div>
          </SwiperSlide>
        ))}
      {images.length > 1 && <SlideButton></SlideButton>}
    </Swiper>
  );
};

export default SlideImages;
