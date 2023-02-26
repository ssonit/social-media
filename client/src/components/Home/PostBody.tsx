import React, { FC } from 'react';
import { IUserShort } from '~/types/user';
import CommentIcon from '../Icons/CommentIcon';
import ShareIcon from '../Icons/ShareIcon';
import LikeBtnPost from './LikeBtnPost';
import SaveButton from './SaveButton';

interface IProps {
  _id: string;
  likes: IUserShort[];
  handleOpenPostComment?: () => void;
}
const PostBody: FC<IProps> = ({
  _id,
  likes,
  handleOpenPostComment = () => {
    console.log('Open post comment');
  },
}) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3 py-3'>
        <LikeBtnPost _id={_id} likes={likes}></LikeBtnPost>
        <button onClick={handleOpenPostComment}>
          <CommentIcon></CommentIcon>
        </button>
        <button>
          <ShareIcon></ShareIcon>
        </button>
      </div>
      <SaveButton postId={_id} classNameIcon='w-6 h-6'></SaveButton>
    </div>
  );
};

export default PostBody;
