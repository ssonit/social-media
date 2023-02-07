import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useContext } from 'react';
import ButtonForm from '~/components/Form/ButtonForm';
import { AppContext } from '~/contexts/AppContext';
import MainLayout from '~/layouts/MainLayout';
import authApi from '~/services/auth';
import postApi from '~/services/post';

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

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postApi.getPostList(),
    enabled: !!isAuthenticated,
  });

  console.log(data);
  return (
    <MainLayout>
      home
      <ButtonForm
        type='button'
        onClick={handleLogout}
        isLoading={logoutMutation.isLoading}
        disabled={logoutMutation.isLoading}
      >
        {'Log out'}
      </ButtonForm>
    </MainLayout>
  );
};

export default Home;
