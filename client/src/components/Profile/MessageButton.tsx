import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import { AppContext } from '~/contexts/AppContext';
import conversationApi from '~/services/conversation';
import { IUser } from '~/types/user';

interface IProps {
  userData: IUser;
}

const MessageButton: FC<IProps> = ({ userData }) => {
  const { currentUser } = useContext(AppContext);
  const createConversationMutation = useMutation({
    mutationFn: (body: { members: string[]; name: string }) =>
      conversationApi.createConversation(body.members, body.name),
  });

  const handleCreateConversation = async () => {
    if (currentUser?._id !== userData._id && currentUser) {
      const members = [currentUser?._id, userData._id];
      const name = userData.username;
      const data = await createConversationMutation.mutateAsync({
        members,
        name,
      });
      console.log(data);
    }
  };

  return (
    <button
      onClick={handleCreateConversation}
      className='flex-1 px-4 py-2 text-sm font-semibold rounded md:flex-none bg-grayBtn md:px-10 text-graySecondary'
    >
      Message
    </button>
  );
};

export default MessageButton;
