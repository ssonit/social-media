import React, { FC, useContext, useMemo } from 'react';
import { PostContext } from '~/contexts/PostContext';
import ModalLayout from '~/layouts/ModalLayout';
import { IPropsModal } from '~/types/global';
import { IPostGenerate } from '~/types/post';
import InputComment from '../Common/InputComment';
import CommentList from '../Home/CommentList';
import PostBody from '../Home/PostBody';
import PostContent from '../Home/PostContent';
import PostHeader from '../Home/PostHeader';
import PostLikes from '../Home/PostLikes';
import SlideImages from '../Home/SlideImages';

const ModalComment: FC<IPropsModal> = ({ handleCloseModal, openModal }) => {
  const { postComment } = useContext(PostContext);
  const { userId, createdAt, images, description, _id, likes } = useMemo(
    () => postComment as IPostGenerate,
    [postComment],
  );

  return (
    <ModalLayout handleCloseModal={handleCloseModal} openModal={openModal}>
      <div className='max-w-2xl w-[672px] max-h-[500px] bg-white overflow-y-auto scrollbar-hide rounded-md'>
        <div className='relative h-full'>
          <PostHeader createdAt={createdAt} userId={userId}></PostHeader>
          <div className='px-4 mb-3'>
            <PostContent description={description} userId={userId}></PostContent>
          </div>
          <div className='px-16 border-y border-grayPrimary'>
            <SlideImages images={images}></SlideImages>
          </div>
          <div className='px-4'>
            <div className='flex items-center justify-between py-2 text-sm border-b border-grayPrimary'>
              <PostLikes likes={likes}></PostLikes>
              <div className='font-medium text-grayText'>405 comments</div>
            </div>
            <PostBody _id={_id} likes={likes}></PostBody>
            <div className='mt-3 mb-12'>
              <CommentList></CommentList>
            </div>
          </div>
          <div className='fixed bottom-0 z-10 w-full'>
            <InputComment></InputComment>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ModalComment;
