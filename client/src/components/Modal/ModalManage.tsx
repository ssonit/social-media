import React, { FC, useContext } from 'react';
import { ModalContext } from '~/contexts/ModalContext';
import { ModalType } from '~/utils/constants';
import ModalPostCreator from './ModalPostCreator';

const ModalManage: FC = () => {
  const { modalOpenList, handleCloseModal } = useContext(ModalContext);
  return (
    <>
      <ModalPostCreator
        openModal={modalOpenList.includes(ModalType.POST_CREATOR)}
        handleCloseModal={() => handleCloseModal(ModalType.POST_CREATOR)}
      ></ModalPostCreator>
    </>
  );
};

export default ModalManage;
