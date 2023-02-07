import { FC, useState } from 'react';
import { IPosts } from '~/types/post';
import AvatarGradient from '../Common/AvatarGradient';
import CommentIcon from '../Icons/CommentIcon';
import HeartIcon from '../Icons/HeartIcon';
import OptionIcon from '../Icons/OptionIcon';
import SaveIcon from '../Icons/SaveIcon';
import ShareIcon from '../Icons/ShareIcon';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import PinkHeartIcon from '../Icons/PinkHeartIcon';

const PostItem: FC<IPosts> = ({ userId, createdAt, description, _id }) => {
  const { avatar, username } = userId;
  const dateTime = moment(createdAt).startOf('day').fromNow();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  return (
    <div>
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2'>
          <AvatarGradient size='medium' url={avatar}></AvatarGradient>
          <div className='flex flex-col text-graySecondary'>
            <div className='flex items-center gap-2'>
              <h3 className='text-sm font-semibold'>{username || 'khanhvyccf'}</h3>

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
            <span className='inline-block text-xs'>Singapore</span>
          </div>
        </div>
        <div className='post-left'>
          <OptionIcon></OptionIcon>
        </div>
      </div>
      <div className='w-full h-[125%]'>
        <img
          src='https://vaithuhayho.com/wp-content/uploads/2022/09/anh-gai-xinh-deo-kinh-35.jpg'
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
          <span className='text-grayText text-[10px] uppercase'>{dateTime || '13 giờ trước'}</span>
          <span className='ml-2 text-xs font-semibold text-graySecondary'>Xem bản dịch</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
