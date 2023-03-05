import SlideImages from './SlideImages';
import { PostContext } from '~/contexts/PostContext';
import { ModalType } from '~/utils/constants';
import { ModalContext } from '~/contexts/ModalContext';
import { IPostGenerate } from '~/types/post';
import { FC, useContext } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostBody from './PostBody';
import PostLikes from './PostLikes';
import OptionMenu from '../Common/OptionMenu';

const PostItem: FC<IPostGenerate> = (props) => {
  const { userId, createdAt, description, images, _id, likes, comments } = props;

  const { setStatus, setPostData, setPostCommentId } = useContext(PostContext);
  const { handleOpenModal } = useContext(ModalContext);

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
        <OptionMenu post={props} handleStatusEdit={handleStatusEdit}></OptionMenu>
      </PostHeader>

      <div className='px-4 mb-3'>
        <PostContent description={description}></PostContent>
      </div>

      <div className='border-y border-grayPrimary'>
        <SlideImages images={images}></SlideImages>
      </div>
      <div className='px-4 mb-2'>
        <PostBody _id={_id} handleOpenPostComment={handleOpenPostComment} likes={likes}></PostBody>
        <div className='mb-2'>
          <PostLikes likes={likes}></PostLikes>
        </div>
        <button onClick={handleOpenPostComment} className='my-1 text-sm text-grayText'>
          Xem tất cả {comments.length} bình luận
        </button>
      </div>
    </div>
  );
};

export default PostItem;
