import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { ModalContext } from '~/contexts/ModalContext';
import { PostContext } from '~/contexts/PostContext';
import commentApi from '~/services/comment';
import postApi from '~/services/post';
import { ModalType } from '~/utils/constants';
import RemoveIcon from '../Icons/RemoveIcon';
import ModalConfirm from '../Modal/ModalConfirm';

interface IProps {
  userId: string;
  postId: string;
  commentsId: string[];
}
const RemoveButton: FC<IProps> = ({ commentsId, postId, userId }) => {
  const { currentUser } = useContext(AppContext);
  const { postList, setPostList } = useContext(PostContext);
  const { handleOpenModal, handleCloseModal, modalOpenList } = useContext(ModalContext);
  const deletePostMutation = useMutation({
    mutationFn: (body: string) => postApi.deletePost(body),
  });

  const deleteManyComments = useMutation({
    mutationFn: (body: string[]) => commentApi.deleteManyComments(body),
  });
  const handleRemovePost = async () => {
    if (currentUser?._id === userId && postId) {
      await deletePostMutation.mutateAsync(postId);
      if (commentsId.length > 0) {
        await deleteManyComments.mutateAsync(commentsId);
      }
      const newPostList = postList?.filter((item) => item._id !== postId) ?? [];
      setPostList(newPostList);
      handleCloseModal(ModalType.CONFIRM_MODAL);
    }
  };
  return (
    <>
      <button
        onClick={() => handleOpenModal(ModalType.CONFIRM_MODAL)}
        className='flex items-center select-none gap-2 px-2 py-1.5 cursor-pointer transition-all hover:bg-grayPrimary w-full'
      >
        <RemoveIcon className='w-5 h-5'></RemoveIcon>
        <span className='text-sm font-semibold'>Remove post</span>
      </button>
      <ModalConfirm
        openModal={modalOpenList.includes(ModalType.CONFIRM_MODAL)}
        handleCloseModal={() => handleCloseModal(ModalType.CONFIRM_MODAL)}
      >
        <button
          type='button'
          className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 transition-all bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
          onClick={handleRemovePost}
        >
          Delete
        </button>
      </ModalConfirm>
    </>
  );
};

export default RemoveButton;
