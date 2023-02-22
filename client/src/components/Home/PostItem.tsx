import SlideImages from './SlideImages';
import SaveIcon from '../Icons/SaveIcon';
import RemoveIcon from '../Icons/RemoveIcon';
import PencilIcon from '../Icons/PencilIcon';
import OptionIcon from '../Icons/OptionIcon';
import { PostContext } from '~/contexts/PostContext';
import { ModalType } from '~/utils/constants';
import { ModalContext } from '~/contexts/ModalContext';
import { IPostGenerate } from '~/types/post';
import { FC, useContext, useState } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostBody from './PostBody';
import PostLikes from './PostLikes';

const PostItem: FC<IPostGenerate> = (props) => {
  const { userId, createdAt, description, images, _id, likes, comments } = props;

  const { setStatus, setPostData, setPostCommentId } = useContext(PostContext);
  const { handleOpenModal } = useContext(ModalContext);

  const [showOption, setShowOption] = useState(false);

  const handleStatusEdit = () => {
    setStatus(true);
    setPostData(props);
    handleOpenModal(ModalType.POST_UPDATE);
  };

  const handleOpenPostComment = () => {
    setPostCommentId(props._id);
    handleOpenModal(ModalType.POST_COMMENT);
  };

  return (
    <div className='lg:border lg:border-grayPrimary lg:rounded-md lg:mb-3'>
      <PostHeader createdAt={createdAt} userId={userId}>
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
      </PostHeader>

      <div className='border-y border-grayPrimary'>
        <SlideImages images={images}></SlideImages>
      </div>
      <div className='px-4 mb-2'>
        <PostBody _id={_id} handleOpenPostComment={handleOpenPostComment} likes={likes}></PostBody>
        <div className='mb-2'>
          <PostLikes likes={likes}></PostLikes>
        </div>
        <PostContent description={description} userId={userId}></PostContent>
        <button onClick={handleOpenPostComment} className='my-1 text-sm text-grayText'>
          Xem tất cả {comments.length} bình luận
        </button>
      </div>
    </div>
  );
};

export default PostItem;
