import React, { FC, useContext } from 'react';
import SearchIcon from '~/components/Icons/SearchIcon';
import Conversation from '~/components/Messages/Conversation';
import ConversationInfo from '~/components/Messages/ConversationInfo';
import MainLayout from '~/layouts/MainLayout';
import VideoIcon from '~/components/Icons/VideoIcon';
import PhoneIcon from '~/components/Icons/PhoneIcon';
import EllipsisCircleIcon from '~/components/Icons/EllipsisCircleIcon';
import FormMessage from '~/components/Messages/FormMessage';
import { ConversationContext } from '~/contexts/ConversationContext';
import { AppContext } from '~/contexts/AppContext';
import { ModalContext } from '~/contexts/ModalContext';
import { ModalType } from '~/utils/constants';
import ModalNewMessage from '~/components/Modal/ModalNewMessage';
import { Link } from 'react-router-dom';
import MessageList from '~/components/Messages/MessageList';

const Messages: FC = () => {
  const { currentChat } = useContext(ConversationContext);
  const { handleOpenModal, modalOpenList } = useContext(ModalContext);
  const { currentUser } = useContext(AppContext);

  return (
    <MainLayout>
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <div className='flex flex-col max-h-screen'>
            <div className='flex items-center justify-between w-full px-3 py-6 bg-white'>
              <h2 className='text-3xl font-semibold text-bluePrimary'>Messages</h2>
              <button
                onClick={() => handleOpenModal(ModalType.NEW_MESSAGE)}
                type='button'
                className='p-2 rounded-full bg-grayPrimary'
              >
                <SearchIcon width='16' height='16' color='#8e8e8e'></SearchIcon>
              </button>
            </div>
            <div className='mx-1 overflow-y-scroll scrollbar-hide'>
              <Conversation></Conversation>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='relative flex flex-col h-screen'>
            <div className='flex items-center justify-between py-4 pr-3'>
              {currentChat && (
                <Link to={`/`} className='flex items-center px-2 py-1 rounded-md hover:bg-gray-200'>
                  <ConversationInfo
                    members={currentChat.members}
                    name={currentChat.name}
                    latestMessage={''}
                  ></ConversationInfo>
                </Link>
              )}
              <div className='flex items-center gap-3'>
                <button>
                  <VideoIcon width='20' height='20' color='#8e8e8e'></VideoIcon>
                </button>
                <button>
                  <PhoneIcon width='20' height='20' color='#8e8e8e'></PhoneIcon>
                </button>
                <button>
                  <EllipsisCircleIcon width='20' height='20' color='#8e8e8e'></EllipsisCircleIcon>
                </button>
              </div>
            </div>
            <div className='flex flex-col flex-1 overflow-y-scroll rounded-t-lg mb-11 bg-gray-200/50 scrollbar-hide'>
              {currentChat?._id && <MessageList conversationId={currentChat._id}></MessageList>}
            </div>
            <div className='absolute bottom-0 w-full'>
              {currentChat && currentUser && (
                <FormMessage
                  conversationId={currentChat?._id}
                  senderId={currentUser?._id}
                ></FormMessage>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalOpenList.includes(ModalType.NEW_MESSAGE) && <ModalNewMessage></ModalNewMessage>}
    </MainLayout>
  );
};

export default Messages;
