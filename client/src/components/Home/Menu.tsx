import { FC } from 'react';
import MenuItem from './MenuItem';
import MenuNews from './MenuNews';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSuggestionQuery from '~/hooks/useSuggestionQuery';

const Menu: FC = () => {
  const suggestionQuery = useSuggestionQuery();
  return (
    <section className='flex gap-4 overflow-y-auto scrollbar-hide'>
      <MenuNews></MenuNews>
      <Swiper
        spaceBetween={0}
        slidesPerView={'auto'}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {suggestionQuery.data?.data.data?.map((item, index) => (
          <SwiperSlide className='!w-[85px]' key={index}>
            <MenuItem user={item}></MenuItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Menu;
