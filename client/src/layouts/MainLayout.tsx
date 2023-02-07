import { FC } from 'react';
import Navbar from '~/components/Common/Navbar';
import NavbarMobile from '~/components/Mobile/NavbarMobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className='fixed top-0 bottom-0 left-0 z-50'>
        <Navbar></Navbar>
      </div>
      <div className='md:ml-14 lg:ml-[250px]'>{children}</div>
      <NavbarMobile></NavbarMobile>
    </div>
  );
};

export default MainLayout;
