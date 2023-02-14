import { FC, useContext, useEffect, useState } from 'react';
import AvatarGradient from '../Common/AvatarGradient';
import CommentIcon from '../Icons/CommentIcon';
import HeartIcon from '../Icons/HeartIcon';
import OptionIcon from '../Icons/OptionIcon';
import SaveIcon from '../Icons/SaveIcon';
import ShareIcon from '../Icons/ShareIcon';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import PinkHeartIcon from '../Icons/PinkHeartIcon';
import { IPostGenerate, IPostGenerateResponse } from '~/types/post';
import SlideImages from './SlideImages';
import PencilIcon from '../Icons/PencilIcon';
import RemoveIcon from '../Icons/RemoveIcon';
import { PostContext } from '~/contexts/PostContext';
import { ModalContext } from '~/contexts/ModalContext';
import { ModalType } from '~/utils/constants';
import { AppContext } from '~/contexts/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postApi from '~/services/post';
import Avatar from '../Common/Avatar';
import { AxiosResponse } from 'axios';

const PostItem: FC<IPostGenerate> = (props) => {
  const { userId, createdAt, description, images, _id, likes } = props;
  const dateTime = moment(createdAt).fromNow();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { setStatus, setPostData } = useContext(PostContext);
  const { handleOpenModal } = useContext(ModalContext);
  const { currentUser } = useContext(AppContext);
  const [like, setLike] = useState(() => likes.some((item) => item._id === currentUser?._id));

  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    if (likes.length > 0) {
      setLike(likes.some((item) => item._id === currentUser?._id));
    }
  }, [currentUser, likes]);

  const handleStatusEdit = () => {
    setStatus(true);
    setPostData(props);
    handleOpenModal(ModalType.POST_UPDATE);
  };

  const likePostMutation = useMutation({
    mutationFn: (body: string) => postApi.likePost(body),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<AxiosResponse<IPostGenerateResponse>>([
        'posts',
      ]);

      if (previousPosts) {
        queryClient.setQueryData(['posts'], () => {
          console.log(
            {
              ...previousPosts,
              data: {
                msg: previousPosts?.data.msg,
                data: previousPosts.data.data.map((item) => {
                  if (item._id === postId) {
                    return {
                      ...item,
                      likes: item.likes.filter((like) => like._id !== currentUser?._id),
                    };
                  }
                  return item;
                }),
              },
            },
            'data',
          );
          return {
            ...previousPosts,
            data: {
              msg: previousPosts?.data.msg,
              data: previousPosts.data.data.map((item) => {
                if (item._id === postId) {
                  return {
                    ...item,
                    likes: [
                      ...item.likes,
                      {
                        _id: currentUser?._id,
                        avatar: currentUser?.avatar,
                        fullname: currentUser?.fullname,
                        username: currentUser?.username,
                      },
                    ],
                  };
                }
                return item;
              }),
            },
          };
        });
      }

      return { previousPosts };
    },
    onError: (error, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context?.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const unLikePostMutation = useMutation({
    mutationFn: (body: string) => postApi.unLikePost(body),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<AxiosResponse<IPostGenerateResponse>>([
        'posts',
      ]);

      if (previousPosts) {
        queryClient.setQueryData(['posts'], () => {
          return {
            ...previousPosts,
            data: {
              msg: previousPosts?.data.msg,
              data: previousPosts.data.data.map((item) => {
                if (item._id === postId) {
                  return {
                    ...item,
                    likes: item.likes.filter((like) => like._id !== currentUser?._id),
                  };
                }
                return item;
              }),
            },
          };
        });
      }
      return { previousPosts };
    },
    onError: (error, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context?.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleLikePost = async () => {
    if (like) {
      setLike(false);
      const data = await unLikePostMutation.mutateAsync(_id);
      // console.log(data);
    } else {
      setLike(true);
      const data = await likePostMutation.mutateAsync(_id);
      // console.log(data);
    }
    // queryClient.prefetchQuery(['posts']);
  };

  console.log(likes);

  return (
    <div className='lg:border lg:border-grayPrimary lg:rounded-md lg:mb-3'>
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2'>
          <Link to={`/profile/${userId._id}`}>
            <AvatarGradient size='medium' url={userId?.avatar}></AvatarGradient>
          </Link>
          <div className='flex flex-col text-graySecondary'>
            <div className='flex items-center gap-2'>
              <Link to={`/profile/${userId._id}`}>
                <h3 className='text-sm font-semibold'>{userId?.username || ''}</h3>
              </Link>

              {/* {currentUser?._id === userId._id ? (
                ''
              ) : (
                <>
                  <div className='w-1 h-1 rounded-full bg-graySecondary'></div>
                  <button className='text-sm font-medium text-bluePrimary'>
                    {currentUser?.followings.includes(userId._id) ? 'Unfollow' : 'Follow'}
                  </button>
                </>
              )} */}
            </div>
          </div>
        </div>
        <div className='relative'>
          <button
            onClick={() => setShowOption(!showOption)}
            className='p-1 transition-all rounded-full hover:bg-grayPrimary'
          >
            <OptionIcon></OptionIcon>
          </button>
          <ul
            className={`absolute right-0 z-10 w-[160px] bg-white rounded-md shadow-3xl border border-grayPrimary top-full ${
              showOption ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            <li>
              <button
                onClick={handleStatusEdit}
                className='transition-all select-none hover:bg-grayPrimary flex items-center gap-2 px-2 py-1.5 w-full'
              >
                <PencilIcon className='w-5 h-5'></PencilIcon>
                <span className='text-sm font-semibold'>Edit post</span>
              </button>
            </li>
            <li>
              <button className='flex items-center select-none gap-2 px-2 py-1.5 cursor-pointer transition-all hover:bg-grayPrimary w-full'>
                <RemoveIcon className='w-5 h-5'></RemoveIcon>
                <span className='text-sm font-semibold'>Remove post</span>
              </button>
            </li>
            <li>
              <button className='flex items-center select-none gap-2 px-2 py-1.5 cursor-pointer transition-all hover:bg-grayPrimary w-full'>
                <SaveIcon className='w-5 h-5'></SaveIcon>
                <span className='text-sm font-semibold'>Save post</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='border-y border-grayPrimary'>
        <SlideImages images={images}></SlideImages>
      </div>
      <div className='px-4 mb-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 py-3'>
            <button onClick={handleLikePost}>
              {like ? (
                <div className='animation-heart'>
                  <PinkHeartIcon></PinkHeartIcon>
                </div>
              ) : (
                <HeartIcon></HeartIcon>
              )}
            </button>
            <button onClick={() => navigate(`/p/${_id}/comments`)}>
              <CommentIcon></CommentIcon>
            </button>
            <ShareIcon></ShareIcon>
          </div>
          <button>
            <SaveIcon></SaveIcon>
          </button>
        </div>
        <div>
          <div className='mb-2 text-sm font-semibold text-graySecondary'>{`${likes.length} ${
            likes.length > 1 ? 'Likes' : 'Like'
          }`}</div>
          <ul>
            {likes?.map((item) => (
              <li className='flex items-center' key={item._id}>
                <Avatar size='small' url={item.avatar}></Avatar>
                {item.username}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex gap-2 text-sm text-graySecondary'>
          <div>
            <h3 className='inline-block mr-2 font-semibold'>{userId?.username}</h3>
            <span>{description || 'Cà phê, đọc sách, chuyện trò cùng nhau đii ✏️'}</span>
          </div>
        </div>
        <div className='my-1 text-sm text-grayText'>Xem tất cả 55 bình luận</div>
        <div>
          <span className='text-grayText text-[10px] uppercase'>{dateTime}</span>
          <span className='ml-2 text-xs font-semibold text-graySecondary'>Xem bản dịch</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
