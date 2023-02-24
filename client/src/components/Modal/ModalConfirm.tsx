import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useRef } from 'react';
import { IPropsModal } from '~/types/global';

const ModalConfirm: FC<IPropsModal> = ({ handleCloseModal, openModal, children }) => {
  const completeButtonRef = useRef(null);
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog
        initialFocus={completeButtonRef}
        as='div'
        className='relative z-50'
        onClose={handleCloseModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-10' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-2xl font-semibold leading-6 text-center text-gray-900'
                >
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalConfirm;
