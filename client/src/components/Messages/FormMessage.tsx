import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { ConversationContext } from '~/contexts/ConversationContext';
import messageApi from '~/services/message';
import FaceSmileIcon from '../Icons/FaceSmileIcon';
import MapIcon from '../Icons/MapIcon';
import MicrophoneIcon from '../Icons/MicrophoneIcon';
import PaperAirplaneIcon from '../Icons/PaperAirplaneIcon';
import PhotoIcon from '../Icons/PhotoIcon';
import { io, Socket } from 'socket.io-client';
import { AppContext } from '~/contexts/AppContext';

interface IProps {
  conversationId: string;
  senderId: string;
}

const FormMessage: FC<IProps> = ({ conversationId, senderId }) => {
  const [message, setMessage] = useState('');
  const socket = useRef<Socket>();
  const { setMessages, currentChat, setOnlineUsers } = useContext(ConversationContext);
  const { currentUser } = useContext(AppContext);
  const createMessageMutation = useMutation({
    mutationFn: (body: { conversationId: string; senderId: string; text: string }) =>
      messageApi.createMessage(body),
  });

  useEffect(() => {
    socket.current = io('http://localhost:8000', {
      query: { roomId: conversationId },
    });

    socket.current?.on('getMessage', (data) => {
      if (data.senderId !== currentUser?._id) {
        const user = currentChat?.members.find((item) => item._id === data.senderId);
        setMessages((prev) => [
          ...prev,
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
        ]);
      }
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [conversationId, currentChat?.members, currentUser?._id, setMessages]);

  useEffect(() => {
    socket.current?.emit('onlineUser', { userId: senderId });
    socket.current?.on('getUsers', (data) => {
      console.log(data);
      setOnlineUsers(data);
    });
  }, [senderId, setOnlineUsers]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.current?.emit('sendMessage', { message, senderId });

    const data = await createMessageMutation.mutateAsync({
      conversationId,
      senderId,
      text: message,
    });

    setMessages((prev) => [...prev, data.data.data]);
    setMessage('');
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
        <button type='button'>
          <PhotoIcon className='w-5 h-5'></PhotoIcon>
        </button>
        <button type='button'>
          <FaceSmileIcon className='w-5 h-5' color='#262626'></FaceSmileIcon>
        </button>
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
