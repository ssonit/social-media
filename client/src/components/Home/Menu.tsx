import { FC } from 'react';
import MenuItem from './MenuItem';
import MenuNews from './MenuNews';
import { Swiper, SwiperSlide } from 'swiper/react';

const Menu: FC = () => {
  return (
    <section className='flex gap-4 overflow-y-auto scrollbar-hide'>
      <MenuNews></MenuNews>
      <Swiper
        spaceBetween={0}
        slidesPerView={'auto'}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide className='!w-[85px]' key={index}>
              <MenuItem></MenuItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Menu;
