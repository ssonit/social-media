import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { ModalContext } from '~/contexts/ModalContext';
import { PostContext } from '~/contexts/PostContext';
import commentApi from '~/services/comment';
import postApi from '~/services/post';
import { ModalType } from '~/utils/constants';
import { DeleteInactiveIcon } from '../Common/OptionMenu';
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
        className={`text-gray-900 group hover:bg-bluePrimary flex w-full items-center rounded-md px-2 py-2 text-sm`}
      >
        <DeleteInactiveIcon className='w-5 h-5 mr-2' aria-hidden='true' />
        Delete
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
