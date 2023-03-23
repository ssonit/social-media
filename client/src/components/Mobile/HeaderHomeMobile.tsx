import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { instagram } from '~/assets';
import { ModalContext } from '~/contexts/ModalContext';
import { ModalType, pathRoute } from '~/utils/constants';
import LogoutButton from '../Common/LogoutButton';
import HeartIcon from '../Icons/HeartIcon';
import NewsIcon from '../Icons/NewsIcon';
import PlusIcon from '../Icons/PlusIcon';
import PostIcon from '../Icons/PostIcon';

const HeaderHomeMobile: FC = () => {
  const { handleOpenModal } = useContext(ModalContext);
  const [show, setShow] = useState<boolean>(false);
  return (
    <header className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-4 py-2 bg-white border-b border-grayPrimary'>
      <Link to={pathRoute.home} className='h-[30px]'>
        <img src={instagram} alt='instagram' className='object-cover w-full h-full' />
      </Link>

      <div className='flex gap-4'>
        <div className='relative'>
          <button onClick={() => setShow(!show)}>
            <PlusIcon></PlusIcon>
          </button>
          <div
            className={`absolute top-full translate-y-2 left-0 -translate-x-1/2 rounded-lg shadow-xl z-10 bg-white w-[110px] transition duration-300 ${
              show ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-1'
            }`}
          >
            <button
              onClick={() => handleOpenModal(ModalType.POST_CREATOR)}
              className='flex items-center justify-between w-full px-4 py-2'
            >
              <span className='text-sm text-graySecondary'>Bài viết</span>
              <PostIcon></PostIcon>
            </button>
            <button className='flex items-center justify-between w-full px-4 py-2'>
              <span className='text-sm text-graySecondary'>Tin</span>
              <NewsIcon></NewsIcon>
            </button>
          </div>
        </div>
        <button className='self-start'>
          <HeartIcon></HeartIcon>
        </button>
        <LogoutButton></LogoutButton>
      </div>
    </header>
  );
};

export default HeaderHomeMobile;
