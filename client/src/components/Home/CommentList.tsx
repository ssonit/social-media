import React, { FC } from 'react';
import CommentCard from './CommentCard';

const CommentList: FC = () => {
  return (
    <div className=''>
      <CommentCard></CommentCard>
      <CommentCard></CommentCard>
      <CommentCard></CommentCard>
    </div>
  );
};

export default CommentList;
