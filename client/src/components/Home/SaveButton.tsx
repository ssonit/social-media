import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '~/contexts/AppContext';
import postApi from '~/services/post';
import SaveIcon from '../Icons/SaveIcon';

interface IProps {
  postId: string;
  className?: string;
  classNameIcon?: string;
  children?: React.ReactNode;
}

const SaveButton: FC<IProps> = ({ children, className = '', classNameIcon = '', postId }) => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const savePostMutation = useMutation({
    mutationFn: (body: string) => postApi.savePost(body),
  });

  const handleSavePost = async () => {
    const data = await savePostMutation.mutateAsync(postId);
    const saved = data.data.data;
    if (currentUser) setCurrentUser({ ...currentUser, saved });
    if (saved.includes(postId)) {
      toast.success('Saved post success');
    } else {
      toast.success('Remove post from saved');
    }
  };
  return (
    <button
      onClick={handleSavePost}
      className={`${
        children ? 'hover:bg-bluePrimary' : ''
      } text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm ${className}`}
    >
      {currentUser?.saved.includes(postId) ? (
        <SaveIcon className={classNameIcon} colorFill='#262626'></SaveIcon>
      ) : (
        <SaveIcon className={classNameIcon}></SaveIcon>
      )}
      {children}
    </button>
  );
};

export default SaveButton;
