import { FC } from 'react';
import { IUser } from '~/types/user';
import ChevronDown from '../Icons/ChevronDown';

interface IPropsFollowButton {
  userData?: IUser;
}

const FollowButton: FC<IPropsFollowButton> = ({ userData }) => {
  return (
    <div>
      <button className='flex items-center px-4 py-2 rounded bg-grayBtn'>
        <span className='text-sm font-semibold text-graySecondary'>Following</span>
        <div>
          <ChevronDown></ChevronDown>
        </div>
      </button>
    </div>
  );
};

export default FollowButton;
