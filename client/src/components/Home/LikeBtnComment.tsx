import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext, useEffect, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { PostContext } from '~/contexts/PostContext';
import commentApi from '~/services/comment';
import { IComment, IPostGenerate } from '~/types/post';
import { IUser } from '~/types/user';
import { AddData, RemoveData } from '~/utils/constants';
import LikeButton from './LikeButton';

interface IProps {
  comment?: IComment;
}

const LikeBtnComment: FC<IProps> = ({ comment }) => {
  const { currentUser } = useContext(AppContext);
  const { postList, setPostList, postComment } = useContext(PostContext);
  const [isLike, setIsLike] = useState(false);
  const [likeLength, setLikeLength] = useState(0);

  useEffect(() => {
    if (comment?.likes && comment?.likes.length > 0) {
      setIsLike(comment?.likes.some((item) => item._id === currentUser?._id));
      setLikeLength(comment.likes.length);
    }
  }, [comment?.likes, currentUser?._id]);

  const likeCommentMutation = useMutation({
    mutationFn: (body: { commentId: string }) => commentApi.likeComment(body.commentId),
  });

  const unlikeCommentMutation = useMutation({
    mutationFn: (body: { commentId: string }) => commentApi.unlikeComment(body.commentId),
  });

  const handleLike = async () => {
    const commentId = comment?._id as string;
    if (isLike) {
      setIsLike(false);
      setLikeLength(likeLength - 1);
      const newComments = postComment?.comments.map((item) => {
        if (item._id === commentId) {
          return { ...item, likes: RemoveData(item.likes, currentUser as IUser) };
        }
        return item;
      });
      const newPostList = postList?.map((post) => {
        if (post._id === postComment?._id) {
          return { ...post, comments: newComments };
        }
        return post;
      });
      setPostList(newPostList as IPostGenerate[]);
      await unlikeCommentMutation.mutateAsync({ commentId });
    } else {
      setIsLike(true);
      setLikeLength(likeLength + 1);
      const newComments = postComment?.comments.map((item) => {
        if (item._id === commentId) {
          return { ...item, likes: AddData(item.likes, currentUser as IUser) };
        }
        return item;
      });
      const newPostList = postList?.map((post) => {
        if (post._id === postComment?._id) {
          return { ...post, comments: newComments };
        }
        return post;
      });
      setPostList(newPostList as IPostGenerate[]);
      await likeCommentMutation.mutateAsync({ commentId });
    }
  };

  return (
    <LikeButton
      widthIcon='18'
      heightIcon='18'
      className='flex items-center gap-1'
      like={isLike}
      disabled={likeCommentMutation.isLoading || unlikeCommentMutation.isLoading}
      handleLike={handleLike}
    >
      <span>{likeLength}</span>
    </LikeButton>
  );
};

export default LikeBtnComment;
