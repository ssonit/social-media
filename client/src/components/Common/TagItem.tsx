import React, { FC, useEffect, useState } from 'react';
import { IUserShort } from '~/types/user';
import CheckIcon from '../Icons/CheckIcon';
import Avatar from './Avatar';

interface IProps {
  handleAddTag: () => void;
  handleRemoveTag: () => void;
  user: IUserShort;
  checkInput: boolean;
}

const TagItem: FC<IProps> = ({ handleAddTag, handleRemoveTag, user, checkInput }) => {
  const [check, setCheck] = useState(() => checkInput);

  useEffect(() => {
    setCheck(checkInput);
  }, [checkInput]);

  return (
    <div className='flex items-center justify-between'>
      <Avatar size='large' url={user.avatar}></Avatar>
      <div className='ml-2 mr-auto leading-5 truncate'>
        <p className='font-semibold truncate'>{user.username}</p>
        <p className='text-sm text-gray-500 truncate'>{user.fullname}</p>
      </div>
      <div className='ml-3 shrink-0'>
        <input
          type='checkbox'
          name='checkbox'
          id='checkbox'
          onChange={(e) => setCheck(e.target.checked)}
          hidden
          checked={check}
        />
        <button
          onClick={() => {
            setCheck(!check);
            if (check) {
              handleRemoveTag();
            } else {
              handleAddTag();
            }
          }}
          className={`p-0.5 border-2 transition-all duration-200 rounded-full ${
            check ? 'bg-bluePrimary border-bluePrimary' : 'border-graySecondary'
          }`}
        >
          <CheckIcon className='w-4 h-4' color='#ffffff'></CheckIcon>
        </button>
      </div>
    </div>
  );
};

export default TagItem;
