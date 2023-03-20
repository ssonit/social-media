import { FC, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '~/contexts/AppContext';
import { pathRoute } from '~/utils/constants';
import Avatar from '../Common/Avatar';
import HomeIcon from '../Icons/HomeIcon';
import Messenger from '../Icons/Messenger';
import ReelsIcon from '../Icons/ReelsIcon';
import SearchIcon from '../Icons/SearchIcon';

const NavbarMobile: FC = () => {
  const { currentUser } = useContext(AppContext);
  const navbarList = useMemo(
    () => [
      {
        content: <HomeIcon></HomeIcon>,
        active: <HomeIcon color='#0095f6'></HomeIcon>,
        link: pathRoute.home,
      },
      {
        content: <SearchIcon width='24' height='24'></SearchIcon>,
        active: <SearchIcon width='24' height='24' color='#0095f6'></SearchIcon>,
        link: pathRoute.explore,
      },
      {
        content: <ReelsIcon></ReelsIcon>,
        active: <ReelsIcon color='#0095f6'></ReelsIcon>,
        link: '/reels',
      },
      {
        content: <Messenger></Messenger>,
        active: <Messenger color='#0095f6'></Messenger>,
        link: pathRoute.messageId,
      },
      {
        content: <Avatar size='small' url={currentUser?.avatar}></Avatar>,
        active: <Avatar size='small' url={currentUser?.avatar}></Avatar>,
        link: `/profile/${currentUser?._id}`,
      },
    ],
    [currentUser],
  );

  return (
    <nav className='fixed bottom-0 left-0 z-50 w-full bg-white border-t md:hidden border-grayPrimary'>
      <ul className='flex items-center'>
        {navbarList.map((item, index) => (
          <li key={index} className='flex items-center justify-center flex-1'>
            <NavLink className='px-4 py-3' to={item.link}>
              {({ isActive }) => (isActive ? item.active : item.content)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarMobile;
