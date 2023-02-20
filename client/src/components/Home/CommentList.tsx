import React, { FC } from 'react';
import { IComment } from '~/types/post';
import CommentCard from './CommentCard';

interface IProps {
  comments: IComment[];
  level: number;
  maxLevel: number;
}
const CommentList: FC<IProps> = ({ comments, level, maxLevel }) => {
  return (
    <div>
      {comments &&
        comments?.length > 0 &&
        comments
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((comment) => (
            <CommentCard
              level={level}
              maxLevel={maxLevel}
              key={comment._id}
              comment={comment}
            ></CommentCard>
          ))}
    </div>
  );
};

export default CommentList;
