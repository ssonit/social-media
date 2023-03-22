import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import authApi from '~/services/auth';
import LogoutIcon from '../Icons/LogoutIcon';
import Spinner from './Spinner';

const LogoutButton: FC = () => {
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
    <button
      type='button'
      onClick={handleLogout}
      disabled={logoutMutation.isLoading}
      className='flex items-stretch justify-between gap-2 transition-all md:items-center md:px-2 md:py-3 hover:text-bluePrimary'
    >
      <LogoutIcon></LogoutIcon>
      <span className='flex-1 hidden text-left md:block'>Logout</span>
      <div className='hidden md:block'>{logoutMutation.isLoading && <Spinner></Spinner>}</div>
    </button>
  );
};

export default LogoutButton;
