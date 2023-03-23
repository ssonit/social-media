import { useMutation } from '@tanstack/react-query';
import { FC, useContext, useEffect, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import userApi from '~/services/user';
import { IUser, IUserShort } from '~/types/user';
import ChevronDown from '../Icons/ChevronDown';

interface IPropsFollowButton {
  userData: IUser | IUserShort;
  classNameFollow?: string;
  classNameUnFollow?: string;
  icon?: boolean;
  handleClick?: () => void;
}

const FollowButton: FC<IPropsFollowButton> = ({
  userData,
  classNameFollow,
  classNameUnFollow,
  icon = false,
  handleClick,
}) => {
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const [follow, setFollow] = useState<boolean>(
    () => currentUser?.followings.some((user) => user._id === userData?._id) as boolean,
  );

  useEffect(() => {
    if (currentUser?.followings.some((user) => user._id === userData?._id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [currentUser?.followings, userData?._id]);

  const followUserMutation = useMutation({
    mutationFn: (body: string) => userApi.followUser(body),
  });

  const unFollowUserMutation = useMutation({
    mutationFn: (body: string) => userApi.unFollowUser(body),
  });

  const newCurrentUser = currentUser as IUser;
  const handleFollow = () => {
    const id = userData._id as string;
    setFollow(true);
    followUserMutation.mutate(id, {
      onSuccess() {
        setCurrentUser({
          ...newCurrentUser,
          followings: [
            ...newCurrentUser.followings,
            {
              _id: id,
              avatar: userData.avatar,
              fullname: userData.fullname,
              username: userData.username,
            },
          ],
        });
      },
    });

    handleClick && handleClick();
  };

  const handleUnFollow = () => {
    const id = userData._id as string;
    setFollow(false);
    unFollowUserMutation.mutate(id, {
      onSuccess() {
        setCurrentUser({
          ...newCurrentUser,
          followings: newCurrentUser.followings.filter((user) => user._id !== id),
        });
      },
    });
    handleClick && handleClick();
  };

  return (
    <div>
      {follow ? (
        <button onClick={handleUnFollow} className={classNameUnFollow}>
          <span className='text-sm font-semibold'>{icon ? 'Following' : 'UnFollow'}</span>
          {icon && <ChevronDown></ChevronDown>}
        </button>
      ) : (
        <button onClick={handleFollow} className={classNameFollow}>
          <span className='text-sm font-semibold'>Follow</span>
        </button>
      )}
    </div>
  );
};

export default FollowButton;
