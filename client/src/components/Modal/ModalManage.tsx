import React, { FC, useContext } from 'react';
import { ModalContext } from '~/contexts/ModalContext';
import { ModalType } from '~/utils/constants';
import ModalPostCreator from './ModalPostCreator';
import ModalPostUpdate from './ModalPostUpdate';

const ModalManage: FC = () => {
  const { modalOpenList, handleCloseModal } = useContext(ModalContext);
  return (
    <>
      <ModalPostCreator
        openModal={modalOpenList.includes(ModalType.POST_CREATOR)}
        handleCloseModal={() => handleCloseModal(ModalType.POST_CREATOR)}
      ></ModalPostCreator>
      <ModalPostUpdate
        openModal={modalOpenList.includes(ModalType.POST_UPDATE)}
        handleCloseModal={() => handleCloseModal(ModalType.POST_UPDATE)}
      ></ModalPostUpdate>
    </>
  );
};

export default ModalManage;
