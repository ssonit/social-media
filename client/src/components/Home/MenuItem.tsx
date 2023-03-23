import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '~/types/user';
import AvatarGradient from '../Common/AvatarGradient';

interface IProps {
  user: IUser;
}

const MenuItem: FC<IProps> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/profile/${user?._id}`)}
      className='flex flex-col items-center cursor-pointer gap-y-2'
    >
      <div className='relative'>
        <AvatarGradient size='big' url={user.avatar}></AvatarGradient>
      </div>
      <h4 className='w-16 text-xs text-center select-none text-graySecondary'>{user.username}</h4>
    </button>
  );
};

export default MenuItem;
