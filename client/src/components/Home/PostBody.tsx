import React, { FC } from 'react';
import { IUserShort } from '~/types/user';
import CommentIcon from '../Icons/CommentIcon';
import SaveIcon from '../Icons/SaveIcon';
import ShareIcon from '../Icons/ShareIcon';
import LikeBtnPost from './LikeBtnPost';

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
      <button>
        <SaveIcon></SaveIcon>
      </button>
    </div>
  );
};

export default PostBody;
