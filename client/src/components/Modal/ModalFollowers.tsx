import { FC } from 'react';
import ModalLayout from '~/layouts/ModalLayout';
import { IPropsModal } from '~/types/global';
import ModalFollow from './ModalFollow';

const ModalFollowers: FC<IPropsModal> = ({ handleCloseModal, openModal, userData }) => {
  return (
    <ModalLayout handleCloseModal={handleCloseModal} openModal={openModal}>
      <div className={`animation transition-all ${openModal ? 'scale-100' : 'scale-105'}`}>
        <ModalFollow title='Followers' userList={userData?.followers}></ModalFollow>
      </div>
    </ModalLayout>
  );
};

export default ModalFollowers;
