import { FC } from 'react';
import ModalLayout from '~/layouts/ModalLayout';
import { IPropsModal } from '~/types/global';
import ModalFollow from './ModalFollow';

const ModalFollowings: FC<IPropsModal> = ({ handleCloseModal, openModal, userData }) => {
  return (
    <ModalLayout handleCloseModal={handleCloseModal} openModal={openModal}>
      <div className={`animation transition-all ${openModal ? 'scale-100' : 'scale-105'}`}>
        <ModalFollow title='Following' userList={userData?.followings}></ModalFollow>
      </div>
    </ModalLayout>
  );
};

export default ModalFollowings;
