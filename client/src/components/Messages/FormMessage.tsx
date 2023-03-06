import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext, useState } from 'react';
import { ConversationContext } from '~/contexts/ConversationContext';
import messageApi from '~/services/message';
import FaceSmileIcon from '../Icons/FaceSmileIcon';
import MapIcon from '../Icons/MapIcon';
import MicrophoneIcon from '../Icons/MicrophoneIcon';
import PaperAirplaneIcon from '../Icons/PaperAirplaneIcon';
import PhotoIcon from '../Icons/PhotoIcon';

interface IProps {
  conversationId: string;
  sender: string;
}

const FormMessage: FC<IProps> = ({ conversationId, sender }) => {
  const [message, setMessage] = useState('');
  const { setMessages } = useContext(ConversationContext);
  const createMessageMutation = useMutation({
    mutationFn: (body: { conversationId: string; sender: string; text: string }) =>
      messageApi.createMessage(body),
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await createMessageMutation.mutateAsync({
      conversationId,
      sender,
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
