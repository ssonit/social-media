import { useQuery } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '~/contexts/AppContext';
import userApi from '~/services/user';
import Avatar from '../Common/Avatar';
import Spinner from '../Common/Spinner';
import FollowButton from '../Profile/FollowButton';

const RightSideBar: FC = () => {
  const { currentUser } = useContext(AppContext);
  const id = currentUser?._id as string;
  const { data } = useQuery({
    queryKey: ['suggestion', id],
    queryFn: () => userApi.getSuggestionsUser(id),
    enabled: !!id,
  });

  return (
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
          {data && data.data.data.length > 0 ? (
            data?.data.data.map((item, index) => (
              <li key={index} className='flex items-center mb-2'>
                <Link to={`/profile/${item._id}`} className='flex items-center flex-1 gap-2'>
                  <Avatar size='large' url={item.avatar}></Avatar>
                  <div className='flex flex-col flex-1 text-graySecondary'>
                    <h3 className='text-sm font-semibold'>{item.username}</h3>
                    <p className='text-sm'>{item.fullname}</p>
                  </div>
                </Link>
                <FollowButton
                  classNameFollow='px-2 py-1.5 text-xs font-semibold transition-all duration-200 rounded text-bluePrimary hover:bg-bluePrimary/20'
                  classNameUnFollow='px-2 py-1.5 text-xs font-semibold transition-all duration-200 rounded text-bluePrimary hover:bg-bluePrimary/20'
                  userData={item}
                ></FollowButton>
              </li>
            ))
          ) : (
            <div className='flex items-center justify-center text-center'>
              <Spinner></Spinner>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;
