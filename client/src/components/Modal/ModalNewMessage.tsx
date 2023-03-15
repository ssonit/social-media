import { Dialog } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useContext, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { ModalContext } from '~/contexts/ModalContext';
import userApi from '~/services/user';
import { ModalType } from '~/utils/constants';
import TagItem from '../Common/TagItem';
import CloseIcon from '../Icons/CloseIcon';
import Modal from './Modal';

interface TagData {
  id: string;
  name: string;
}

const ModalNewMessage: FC = () => {
  const { modalOpenList, handleCloseModal } = useContext(ModalContext);
  const { currentUser } = useContext(AppContext);
  const [userTags, setUserTags] = useState<TagData[]>([]);

  const userId = currentUser?._id as string;

  const { data } = useQuery({
    queryKey: ['user_conversation', userId],
    queryFn: () => userApi.getUsersWithoutConversation(userId),
  });

  const handleAddTag = (data: TagData) => {
    setUserTags((prev) => [...prev, data]);
  };

  const handleRemoveTag = (id: string) => {
    setUserTags((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Modal
      openModal={modalOpenList.includes(ModalType.NEW_MESSAGE)}
      handleCloseModal={() => handleCloseModal(ModalType.NEW_MESSAGE)}
    >
      <div className='flex items-center justify-between px-4 py-3'>
        <Dialog.Title as='h3' className='text-lg font-semibold leading-6 text-center text-gray-900'>
          New message
        </Dialog.Title>
        <button className='font-semibold text-bluePrimary'>Next</button>
      </div>
      <div className='border-y border-grayPrimary'>
        <div className='flex gap-3 px-4 py-2 min-h-[48px]'>
          <span>To:</span>
          <ul className='flex flex-wrap items-center gap-2'>
            {userTags.map((item, index) => (
              <li
                key={index}
                className='flex items-center px-2 py-1 rounded bg-bluePrimary/20 text-bluePrimary'
              >
                <span>{item.name}</span>
                <button onClick={() => handleRemoveTag(item.id)} className='ml-1'>
                  <CloseIcon color='#0095f6' width='12' height='12'></CloseIcon>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex flex-col gap-2 px-4 py-2'>
        {data?.data.data.map((item, index) => (
          <TagItem
            key={index}
            handleAddTag={() => handleAddTag({ id: item._id, name: item.username })}
            handleRemoveTag={() => handleRemoveTag(item._id)}
            user={item}
            checkInput={userTags.some((u) => u.id === item._id)}
          ></TagItem>
        ))}
      </div>
    </Modal>
  );
};

export default ModalNewMessage;
