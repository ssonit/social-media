import { useMutation } from '@tanstack/react-query';
import { FC, useContext } from 'react';
import ButtonForm from '~/components/Form/ButtonForm';
import { AppContext } from '~/contexts/AppContext';
import MainLayout from '~/layouts/MainLayout';
import authApi from '~/services/auth';
import Menu from '~/components/Home/Menu';
import PostList from '~/components/Home/PostList';
import HeaderHomeMobile from '~/components/Mobile/HeaderHomeMobile';
import RightSideBar from '~/components/Home/RightSideBar';

const Home: FC = () => {
  const { setIsAuthenticated, setCurrentUser, isAuthenticated } = useContext(AppContext);
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logoutUser(),
    onSuccess: () => {
      setIsAuthenticated(false);
      setCurrentUser(null);
    },
  });
  const handleLogout = async () => {
    if (isAuthenticated) {
      logoutMutation.mutate();
    }
  };

  return (
    <MainLayout>
      <div className='mt-[46px] md:hidden'>
        <HeaderHomeMobile></HeaderHomeMobile>
      </div>
      <div className='min-h-screen mb-[50px] grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-2'>
        <div className='hidden lg:block lg:col-span-1'></div>
        <div className='col-span-3 md:col-span-3 lg:mt-6'>
          <div className='px-4 py-2 border-b lg:py-3 lg:mb-4 lg:border lg:rounded-md bg-bgColorPrimary border-grayPrimary'>
            <Menu></Menu>
          </div>
          <PostList></PostList>
          <ButtonForm
            type='button'
            onClick={handleLogout}
            isLoading={logoutMutation.isLoading}
            disabled={logoutMutation.isLoading}
          >
            Log out
          </ButtonForm>
        </div>
        <RightSideBar></RightSideBar>
      </div>
    </MainLayout>
  );
};

export default Home;
