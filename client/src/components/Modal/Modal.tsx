import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useRef } from 'react';
import { IPropsModal } from '~/types/global';

const Modal: FC<IPropsModal> = ({ handleCloseModal, openModal, children }) => {
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
              <Dialog.Panel className='w-full max-w-md px-3 pt-6 pb-3 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
