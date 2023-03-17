import { Dialog } from '@headlessui/react';
import React, { FC, useRef } from 'react';
import { IPropsModal } from '~/types/global';
import Modal from './Modal';

const ModalConfirm: FC<IPropsModal> = ({ handleCloseModal, openModal, children }) => {
  const completeButtonRef = useRef(null);
  return (
    <Modal handleCloseModal={handleCloseModal} openModal={openModal}>
      <Dialog.Title as='h3' className='text-2xl font-semibold leading-6 text-center text-gray-900'>
        Delete Post
      </Dialog.Title>
      <div className='mt-4'>
        <p className='text-sm text-gray-500'>Are you sure you want to delete this post</p>
      </div>

      <div className='flex justify-end gap-2 mt-4'>
        <button
          type='button'
          className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          onClick={handleCloseModal}
          ref={completeButtonRef}
        >
          Cancel
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalConfirm;
