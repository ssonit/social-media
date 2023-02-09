import React, { FC, useState } from 'react';
import ModalLayout from '~/layouts/ModalLayout';
import { IPropsModal } from '~/types/global';
import Avatar from '../Common/Avatar';
import DropZone from '../Common/DropZone';
import CameraIcon from '../Icons/CameraIcon';
import CloseIcon from '../Icons/CloseIcon';
import FaceSmileIcon from '../Icons/FaceSmileIcon';
import PaperClipIcon from '../Icons/PaperClipIcon';
import PhotoIcon from '../Icons/PhotoIcon';

const ModalPostCreator: FC<IPropsModal> = ({ handleCloseModal, openModal }) => {
  const [openDropZone, setOpenDropZone] = useState<boolean>(false);
  return (
    <ModalLayout handleCloseModal={handleCloseModal} openModal={openModal}>
      <div className='flex h-auto py-1 mx-auto transition-all bg-white border border-gray-700 rounded-lg '>
        <div className={`page-1 max-w-lg w-[460px]`}>
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
            <div className='mt-4 bg-white max-h-[280px] overflow-y-auto scrollbar-hide'>
              <textarea
                name='text'
                id='text'
                placeholder='Write here'
                className='w-full text-2xl text-gray-800 border-none outline-none resize-none bg-inherit scrollbar-hide'
                rows={3}
              ></textarea>
              {openDropZone && <DropZone></DropZone>}
            </div>
            <div className='flex items-center justify-between mt-2 text-gray-800'>
              <div className='flex items-center gap-3'>
                <button>
                  <CameraIcon></CameraIcon>
                </button>
                <button onClick={() => setOpenDropZone(!openDropZone)}>
                  <PhotoIcon></PhotoIcon>
                </button>
                <button>
                  <PaperClipIcon></PaperClipIcon>
                </button>
              </div>
              <FaceSmileIcon></FaceSmileIcon>
            </div>
            <button className='w-full py-2 mt-3 text-sm font-semibold text-gray-400 bg-gray-600 rounded-md select-none'>
              Post
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ModalPostCreator;
