import { useMutation } from '@tanstack/react-query';
import { FC, useContext } from 'react';
import ButtonForm from '~/components/Form/ButtonForm';
import { AppContext } from '~/contexts/AppContext';
import MainLayout from '~/layouts/MainLayout';
import authApi from '~/services/auth';
import Menu from '~/components/Home/Menu';
import PostList from '~/components/Home/PostList';
import HeaderHomeMobile from '~/components/Mobile/HeaderHomeMobile';
import Avatar from '~/components/Common/Avatar';

const Home: FC = () => {
  const { setIsAuthenticated, setCurrentUser, isAuthenticated, currentUser } =
    useContext(AppContext);
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
        <div className='relative hidden md:col-span-2 lg:col-span-2 md:block'>
          <div className='absolute inset-0 px-5 py-10 '>
            <div className='flex items-center gap-2'>
              <Avatar size='big' url={currentUser?.avatar}></Avatar>
              <div className='flex flex-col flex-1 text-graySecondary'>
                <h3 className='text-sm font-semibold'>{currentUser?.username}</h3>
                <p className='text-sm'>{currentUser?.fullname}</p>
              </div>
              <button className='text-xs font-semibold text-bluePrimary'>Switch</button>
            </div>
            <div className='flex items-center justify-between mt-4 mb-3'>
              <h3 className='text-sm text-grayText'>Suggestions For You</h3>
              <button className='text-sm font-bold'>See all</button>
            </div>
            <ul>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <li key={index} className='flex items-center gap-2 mb-2'>
                    <Avatar size='large'></Avatar>
                    <div className='flex flex-col flex-1 text-graySecondary'>
                      <h3 className='text-sm font-semibold'>son</h3>
                      <p className='text-sm'>fullname</p>
                    </div>
                    <button className='text-xs font-semibold text-bluePrimary'>Follow</button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
