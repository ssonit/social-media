import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext, useEffect, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { PostContext } from '~/contexts/PostContext';
import postApi from '~/services/post';
import { IPostGenerate } from '~/types/post';
import { IUserShort } from '~/types/user';
import LikeButton from './LikeButton';

interface IProps {
  likes: IUserShort[];
  _id: string;
}

const LikeBtnPost: FC<IProps> = ({ likes, _id }) => {
  const { currentUser } = useContext(AppContext);
  const { postList, setPostList } = useContext(PostContext);
  const [like, setLike] = useState(() => likes.some((item) => item._id === currentUser?._id));

  useEffect(() => {
    if (likes.length > 0) {
      setLike(likes.some((item) => item._id === currentUser?._id));
    } else {
      setLike(false);
    }
  }, [currentUser, likes]);

  const likePostMutation = useMutation({
    mutationFn: (body: string) => postApi.likePost(body),
  });

  const unLikePostMutation = useMutation({
    mutationFn: (body: string) => postApi.unLikePost(body),
  });

  const handleLike = async () => {
    if (like) {
      setLike(false);
      await unLikePostMutation.mutateAsync(_id);
      const newPosts = postList?.map((item) => {
        if (item._id === _id) {
          return {
            ...item,
            likes: item.likes.filter((like) => like._id !== currentUser?._id),
          };
        }
        return item;
      });
      if (newPosts) setPostList(newPosts);
    } else {
      setLike(true);
      await likePostMutation.mutateAsync(_id);
      const newPosts = postList?.map((item) => {
        if (item._id === _id) {
          return {
            ...item,
            likes: [
              ...item.likes,
              {
                _id: currentUser?._id,
                avatar: currentUser?.avatar,
                fullname: currentUser?.fullname,
                username: currentUser?.username,
              },
            ],
          };
        }
        return item;
      });
      if (newPosts) setPostList(newPosts as IPostGenerate[]);
    }
  };

  return (
    <LikeButton
      like={like}
      handleLike={handleLike}
      disabled={likePostMutation.isLoading || unLikePostMutation.isLoading}
    ></LikeButton>
  );
};

export default LikeBtnPost;
