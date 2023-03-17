import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ConversationContext } from '~/contexts/ConversationContext';
import messageApi from '~/services/message';
import MapIcon from '../Icons/MapIcon';
import MicrophoneIcon from '../Icons/MicrophoneIcon';
import PaperAirplaneIcon from '../Icons/PaperAirplaneIcon';
import PhotoIcon from '../Icons/PhotoIcon';
import { AppContext } from '~/contexts/AppContext';
import Emoji from '../Common/Emoji';

interface IProps {
  conversationId: string;
  senderId: string;
}

const FormMessage: FC<IProps> = ({ conversationId, senderId }) => {
  const [message, setMessage] = useState('');
  const { currentChat, setConversations, setLocalMessages } = useContext(ConversationContext);
  const { currentUser, socket } = useContext(AppContext);
  const createMessageMutation = useMutation({
    mutationFn: (body: { conversationId: string; senderId: string; text: string }) =>
      messageApi.createMessage(body),
  });

  useEffect(() => {
    socket?.emit('joinRoom', { roomId: conversationId });
  }, [conversationId, socket]);

  useEffect(() => {
    socket?.on('getMessage', (data) => {
      if (data.senderId !== currentUser?._id) {
        const user = currentChat?.members.find((item) => item._id === data.senderId);
        setConversations((prev) => {
          return prev.map((item) => {
            if (item._id === data.roomId) {
              return {
                ...item,
                latestMessage: {
                  text: data.message,
                  createdAt: new Date().toISOString(),
                },
              };
            }
            return item;
          });
        });

        setLocalMessages((prev) => [
          {
            _id: 'uid',
            conversationId: data.roomId,
            sender: {
              _id: data.senderId,
              avatar: user?.avatar as string,
              username: user?.username as string,
              fullname: user?.username as string,
            },
            text: data.message,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    });
    return () => {
      socket?.off('getMessage');
    };
  }, [
    conversationId,
    currentChat?.members,
    currentUser?._id,
    message,
    setConversations,
    setLocalMessages,
    socket,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    const data = await createMessageMutation.mutateAsync({
      conversationId,
      senderId,
      text: message,
    });

    socket?.emit('sendMessage', { message, senderId, roomId: conversationId });

    setConversations((prev) => {
      return prev.map((item) => {
        if (item._id === conversationId) {
          return {
            ...item,
            latestMessage: {
              text: message,
              createdAt: new Date().toISOString(),
            },
          };
        }
        return item;
      });
    });

    setLocalMessages((prev) => [data.data.data, ...prev]);
    setMessage('');
  };

  const handleChangeMessage = (value: string) => {
    setMessage((prev) => prev + value);
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center py-2.5 px-3 bg-gray-300 rounded-md'>
      <button type='button'>
        <MicrophoneIcon className='w-5 h-5'></MicrophoneIcon>
      </button>
      <input
        type='text'
        placeholder='Type a message...'
        className='flex-1 ml-1.5 mr-3 bg-inherit'
        name='message'
        id='message'
        autoComplete='off'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='flex items-center gap-3'>
        <div className='flex flex-col'>
          <input type='file' name='image' id='image' hidden />
          <label htmlFor='image' className='cursor-pointer'>
            <PhotoIcon className='w-5 h-5'></PhotoIcon>
          </label>
        </div>
        <Emoji handleChangeMessage={handleChangeMessage}></Emoji>
        <button disabled={createMessageMutation.isLoading} type='submit'>
          <PaperAirplaneIcon className='w-5 h-5'></PaperAirplaneIcon>
        </button>
        <button type='button'>
          <MapIcon className='w-5 h-5'></MapIcon>
        </button>
      </div>
    </form>
  );
};

export default FormMessage;
