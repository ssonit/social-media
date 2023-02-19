import React, { FC, useEffect, useState } from 'react';
import { IComment } from '~/types/post';
import CommentCard from './CommentCard';

interface IProps {
  comments: IComment[];
}
const CommentList: FC<IProps> = ({ comments }) => {
  const [showComments, setShowComments] = useState<IComment[]>([]);

  const [replyComments, setReplyComments] = useState<IComment[]>([]);

  useEffect(() => {
    const newComments = comments.filter((comment) => !comment.reply);
    setShowComments(newComments);
    const newReplyComments = comments.filter((comment) => comment.reply);
    setReplyComments(newReplyComments);
  }, [comments]);

  return (
    <div>
      {showComments.length > 0 &&
        showComments
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((comment) => (
            <CommentCard key={comment._id} comment={comment}>
              <div className='ml-10'>
                {replyComments
                  .filter((item) => item.reply === comment._id)
                  .map((replyComment) => (
                    <CommentCard comment={replyComment} key={replyComment._id}></CommentCard>
                  ))}
              </div>
            </CommentCard>
          ))}
    </div>
  );
};

export default CommentList;
