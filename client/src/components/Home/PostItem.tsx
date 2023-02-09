import { FC, useState } from 'react';
import AvatarGradient from '../Common/AvatarGradient';
import CommentIcon from '../Icons/CommentIcon';
import HeartIcon from '../Icons/HeartIcon';
import OptionIcon from '../Icons/OptionIcon';
import SaveIcon from '../Icons/SaveIcon';
import ShareIcon from '../Icons/ShareIcon';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import PinkHeartIcon from '../Icons/PinkHeartIcon';
import { IPostGenerate } from '~/types/post';
import { avatarUrl, getPathImage } from '~/utils/constants';

const PostItem: FC<IPostGenerate> = ({ userId, createdAt, description, images, _id }) => {
  const dateTime = moment(createdAt).startOf('day').fromNow();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  return (
    <div className='lg:border lg:border-grayPrimary lg:rounded-md lg:mb-3'>
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2'>
          <AvatarGradient size='medium' url={userId?.avatar}></AvatarGradient>
          <div className='flex flex-col text-graySecondary'>
            <div className='flex items-center gap-2'>
              <h3 className='text-sm font-semibold'>{userId?.username || ''}</h3>

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
        <div className='post-left'>
          <OptionIcon></OptionIcon>
        </div>
      </div>
      <div className='w-full h-[125%]'>
        <img
          src={getPathImage(images?.[0]) || avatarUrl}
          alt='post-img'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='px-4 mb-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 py-3'>
            <button onClick={() => setLike(!like)}>
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
        <div className='mb-2 text-sm font-semibold text-graySecondary'>24,955 lượt thích</div>
        <div className='flex gap-2 text-sm text-graySecondary'>
          <div>
            <h3 className='inline-block mr-2 font-semibold'>khanhvyccf</h3>
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
