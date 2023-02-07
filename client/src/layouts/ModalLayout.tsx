import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '~/components/Icons/CloseIcon';

interface IPropsModalLayout {
  children: ReactNode;
  openModal: boolean;
  handleCloseModal: () => void;
}

const ModalLayout: FC<IPropsModalLayout> = ({ children, handleCloseModal, openModal }) => {
  return createPortal(
    <div
      className={`fixed inset-0 z-[60] transition-all ${openModal ? '' : 'invisible opacity-0'}`}
    >
      <div className='absolute inset-0 bg-black opacity-60'></div>
      <button className='absolute p-1 top-4 right-4' onClick={handleCloseModal}>
        <CloseIcon></CloseIcon>
      </button>
      <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>{children}</div>
    </div>,
    document.querySelector('body') as HTMLBodyElement,
  );
};

export default ModalLayout;
