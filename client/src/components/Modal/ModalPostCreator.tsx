import React, { FC } from 'react';
import ModalLayout from '~/layouts/ModalLayout';
import { IPropsModal } from '~/types/global';
import Avatar from '../Common/Avatar';
import CameraIcon from '../Icons/CameraIcon';
import CloseIcon from '../Icons/CloseIcon';
import FaceSmileIcon from '../Icons/FaceSmileIcon';
import PaperClipIcon from '../Icons/PaperClipIcon';
import PhotoIcon from '../Icons/PhotoIcon';

const ModalPostCreator: FC<IPropsModal> = ({ handleCloseModal, openModal }) => {
  return (
    <ModalLayout handleCloseModal={handleCloseModal} openModal={openModal}>
      <div className='max-w-lg w-[460px] py-1 mx-auto text-white bg-white border border-gray-700 rounded-lg'>
        <div className='relative flex items-center justify-center px-3 py-3 border-b border-grayPrimary'>
          <h2 className='text-xl font-bold text-center text-gray-800'>Create Post</h2>
          <button className='absolute inline-block p-3 bg-gray-700 rounded-full right-3'>
            <CloseIcon></CloseIcon>
          </button>
        </div>
        <div className='p-3'>
          <div className='flex items-center gap-3'>
            <Avatar size='large'></Avatar>
            <div className='text-gray-800'>
              <div className='font-semibold '>anhsson</div>
              <div className='text-sm leading-4'>fullname</div>
            </div>
          </div>

          {/* input */}
          <div className='mt-4 bg-white'>
            <textarea
              name='text'
              id='text'
              placeholder='Write here'
              className='w-full text-2xl text-gray-800 border-none outline-none resize-none bg-inherit'
              rows={3}
            ></textarea>
            <div className='flex items-center justify-between text-gray-800'>
              <div className='flex items-center gap-3'>
                <CameraIcon></CameraIcon>
                <PhotoIcon></PhotoIcon>
                <PaperClipIcon></PaperClipIcon>
              </div>
              <FaceSmileIcon></FaceSmileIcon>
            </div>
          </div>

          <button className='w-full py-2 mt-3 text-sm font-semibold text-gray-400 bg-gray-600 rounded-md'>
            Post
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ModalPostCreator;
