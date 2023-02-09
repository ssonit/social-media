import React, { FC } from 'react';
import { IUserShort } from '~/types/user';
import Avatar from '../Common/Avatar';

interface IProps {
  title?: string;
  userList?: IUserShort[];
  userRecommend?: [];
}

const ModalFollow: FC<IProps> = ({ title = '', userList, userRecommend }) => {
  return (
    <div className='w-[320px] md:w-[420px] lg:w-[520px] relative overflow-y-scroll bg-white rounded-2xl scrollbar-hide'>
      <div className='fixed top-0 left-0 w-full py-2 font-medium text-center bg-white border-b rounded-tr-2xl rounded-tl-2xl border-grayPrimary'>
        {title}
      </div>
      <div className='pt-12 pb-3'>
        {userList?.[0] && (
          <div className='flex flex-col items-center justify-center mt-2 mb-4'>
            {userList?.map((user) => (
              <div
                key={user._id}
                className='flex items-center justify-between px-4 py-2 text-sm h-[65px] w-full'
              >
                <div className='flex items-center gap-2 truncate'>
                  <Avatar size='large' url={user.avatar}></Avatar>
                  <div className='flex flex-col truncate'>
                    <h4 className='font-semibold truncate'>{user.username}</h4>
                    <div className='truncate text-grayText'>{user.fullname}</div>
                  </div>
                </div>
                <button className='px-4 py-2 ml-1 font-medium text-white rounded-md lg:ml-5 md:ml-3 shrink-0 bg-bluePrimary'>
                  Unfollow
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='px-4 font-semibold'>Gợi ý cho bạn</div>
        <div className='flex flex-col items-center justify-center mt-2'></div>
      </div>
    </div>
  );
};

export default ModalFollow;
