import { FC, useContext, useEffect, useMemo, useState } from 'react';
import Avatar from '~/components/Common/Avatar';
import DiscoverIcon from '~/components/Icons/DiscoverIcon';
import OptionIcon from '~/components/Icons/OptionIcon';
import MainLayout from '~/layouts/MainLayout';
import Menu from '~/components/Home/Menu';
import SaveIcon from '~/components/Icons/SaveIcon';
import PostGridIcon from '~/components/Icons/PostGridIcon';
import FeedIcon from '~/components/Icons/FeedIcon';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FollowButton from '~/components/Profile/FollowButton';
import HeaderMobile from '~/components/Mobile/HeaderMobile';
import userApi from '~/services/user';
import { AppContext } from '~/contexts/AppContext';
import { IUser } from '~/types/user';
import ModalFollowers from '~/components/Modal/ModalFollowers';
import { ModalContext } from '~/contexts/ModalContext';
import { ModalType } from '~/utils/constants';
import ModalFollowings from '~/components/Modal/ModalFollowings';
import PostsUser from '~/components/Profile/PostsUser';
import useQueryParams from '~/hooks/useQueryParams';
import PostSaved from '~/components/Profile/PostSaved';
// import PostList from '~/components/Home/PostList';

const Profile: FC = () => {
  const { userId } = useParams();
  const { model } = useQueryParams();

  const { currentUser } = useContext(AppContext);
  const { modalOpenList, handleCloseModal, handleOpenModal } = useContext(ModalContext);

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId as string),
    enabled: !!userId && userId !== currentUser?._id,
  });

  const [userData, setUserData] = useState<IUser | null>(() => currentUser);
  const personal = useMemo(() => userId === currentUser?._id, [currentUser?._id, userId]);

  useEffect(() => {
    if (userId !== currentUser?._id) setUserData(data?.data.data as IUser);
    else setUserData(currentUser);
  }, [currentUser, currentUser?._id, data?.data.data, userId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  console.log(userData?.saved);

  return (
    <MainLayout>
      <HeaderMobile username={userData?.username}></HeaderMobile>
      <section>
        <div className='px-3 py-4'>
          <div className='flex items-center'>
            <Avatar size='super' url={userData?.avatar}></Avatar>
            <div className='flex-1 ml-8 '>
              <div className='flex items-center mb-4'>
                <h2 className='mr-4 text-2xl font-light text-graySecondary'>
                  {userData?.username}
                </h2>
                <OptionIcon></OptionIcon>
              </div>
              <div>
                {personal ? (
                  <Link to='/accounts/edit' className='inline-block w-full md:w-[400px]'>
                    <button className='w-full md:max-w-[400px] px-4 py-2 text-sm font-semibold rounded bg-grayBtn'>
                      Edit profile
                    </button>
                  </Link>
                ) : (
                  <div className='flex items-center justify-between gap-1 md:gap-2 md:justify-start'>
                    <FollowButton userData={userData as IUser}></FollowButton>
                    <button className='flex-1 px-4 py-2 text-sm font-semibold rounded md:flex-none bg-grayBtn md:px-10 text-graySecondary'>
                      Message
                    </button>
                    <button className='px-2 py-2 bg-grayBtn flex items-center justify-center w-h-9 h-9 rounded-[4px]'>
                      <DiscoverIcon></DiscoverIcon>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <div className='text-sm font-semibold text-graySecondary'>{userData?.fullname}</div>
            <p className='text-sm text-graySecondary'>{userData?.story}</p>
            {userData?.website && (
              <a
                className='text-sm font-semibold'
                href={userData?.website}
                target='_blank'
                rel='noreferrer'
              >
                {userData?.website}
              </a>
            )}
          </div>
        </div>
        <div className='md:hidden'>
          <Menu></Menu>
        </div>
      </section>
      <section className='flex items-center py-3 mt-4 text-sm border-y border-grayPrimary'>
        <div className='flex flex-col items-center flex-1'>
          <div className='font-medium text-graySecondary'>{'0'}</div>
          <div className='text-grayText'>posts</div>
        </div>
        <button
          className='flex flex-col items-center flex-1'
          onClick={() => handleOpenModal(ModalType.FOLLOWERS_USER)}
        >
          <div className='font-medium text-graySecondary'>{userData?.followers.length}</div>
          <div className='text-grayText'>followers</div>
        </button>
        <button
          className='flex flex-col items-center flex-1'
          onClick={() => handleOpenModal(ModalType.FOLLOWINGS_USER)}
        >
          <div className='font-medium text-graySecondary'>{userData?.followings.length}</div>
          <div className='text-grayText'>following</div>
        </button>
      </section>
      <section className='mb-14'>
        <ul className='flex items-center border-b border-grayPrimary'>
          <li className='flex justify-center flex-1 py-[10px]'>
            <NavLink to={`/profile/${userData?._id}`}>
              <PostGridIcon color={model === undefined ? '#0095f6' : '#8e8e8e'}></PostGridIcon>
            </NavLink>
          </li>
          <li className='flex justify-center flex-1 py-[10px]'>
            <NavLink to={`/profile/${userData?._id}?model=feed`}>
              <FeedIcon color={model === 'feed' ? '#0095f6' : '#8e8e8e'}></FeedIcon>
            </NavLink>
          </li>
          <li className='flex justify-center flex-1 py-[10px]'>
            <NavLink to={`/profile/${userData?._id}?model=tagged`}>
              <SaveIcon color={model === 'tagged' ? '#0095f6' : '#8e8e8e'}></SaveIcon>
            </NavLink>
          </li>
        </ul>
        {userId && model === undefined && <PostsUser userId={userId}></PostsUser>}
        {userId && model === 'tagged' && <PostSaved userId={userId}></PostSaved>}
      </section>

      <>
        <ModalFollowers
          userData={userData as IUser}
          openModal={modalOpenList.includes(ModalType.FOLLOWERS_USER)}
          handleCloseModal={() => handleCloseModal(ModalType.FOLLOWERS_USER)}
        ></ModalFollowers>
        <ModalFollowings
          userData={userData as IUser}
          openModal={modalOpenList.includes(ModalType.FOLLOWINGS_USER)}
          handleCloseModal={() => handleCloseModal(ModalType.FOLLOWINGS_USER)}
        ></ModalFollowings>
      </>
    </MainLayout>
  );
};

export default Profile;
