import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import ModalLayout from '~/layouts/ModalLayout';
import postApi from '~/services/post';
import uploadApi from '~/services/upload';
import { IPropsModal } from '~/types/global';
import Avatar from '../Common/Avatar';
import DropZone from '../Common/DropZone';
import LoadingModal from '../Common/LoadingModal';
import CameraIcon from '../Icons/CameraIcon';
import CloseIcon from '../Icons/CloseIcon';
import FaceSmileIcon from '../Icons/FaceSmileIcon';
import PaperClipIcon from '../Icons/PaperClipIcon';
import PhotoIcon from '../Icons/PhotoIcon';

const ModalPostCreator: FC<IPropsModal> = ({ handleCloseModal, openModal }) => {
  const [openDropZone, setOpenDropZone] = useState<boolean>(false);
  const [text, setText] = useState('');
  const [fileImages, setFileImages] = useState<File[]>([]);
  const pathImages = useMemo(
    () => fileImages.map((file) => URL.createObjectURL(file)),
    [fileImages],
  );

  const { currentUser } = useContext(AppContext);

  const queryClient = useQueryClient();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFileImages([...fileImages, ...acceptedFiles]);
    },
    [fileImages],
  );

  const uploadMultiImagesMutation = useMutation({
    mutationFn: (body: FormData) => uploadApi.uploadMultiImages(body),
  });

  const createPostMutation = useMutation({
    mutationFn: (body: { description: string; images: string[] }) =>
      postApi.createPost(body.description, body.images),
  });

  const handleCloseDropZone = () => {
    setOpenDropZone(false);
  };

  const handleRemoveFile = (index: number) => {
    const newFileImages = [...fileImages];
    newFileImages.splice(index, 1);
    setFileImages(newFileImages);
  };

  const handleRemoveAll = () => {
    setFileImages([]);
  };

  const handleCreatePost = async () => {
    if (fileImages.length > 0 && Boolean(text)) {
      const formData = new FormData();

      fileImages.forEach((file) => {
        formData.append('images', file);
      });

      const uploadData = uploadMultiImagesMutation.mutateAsync(formData);
      const pathImages = (await uploadData).data.data;

      const postData = await createPostMutation.mutateAsync({
        description: text,
        images: pathImages,
      });
      console.log(postData);

      queryClient.invalidateQueries({ queryKey: ['posts'] });

      setText('');
      setFileImages([]);
      handleCloseModal();
    }
  };

  return (
    <ModalLayout handleCloseModal={handleCloseModal} openModal={openModal}>
      <div className='flex h-auto py-1 mx-auto transition-all bg-white border border-gray-700 rounded-lg '>
        <div className={`page-1 max-w-lg w-[320px] md:w-[400px] lg:w-[460px]`}>
          <div className='relative flex items-center justify-center px-3 py-3 border-b border-grayPrimary'>
            <h2 className='text-xl font-bold text-center text-gray-800'>Create Post</h2>
            <button
              onClick={handleCloseModal}
              className='absolute inline-block p-3 bg-gray-700 rounded-full right-3'
            >
              <CloseIcon></CloseIcon>
            </button>
          </div>
          <div className='p-3'>
            <div className='flex items-center gap-3'>
              <Avatar size='large' url={currentUser?.avatar}></Avatar>
              <div className='text-gray-800'>
                <div className='font-semibold'>{currentUser?.username}</div>
                <div className='text-sm leading-4'>{currentUser?.fullname}</div>
              </div>
            </div>
            {/* input */}
            <div className='mt-4 bg-white max-h-[280px] overflow-y-auto scrollbar-hide'>
              <textarea
                name='text'
                id='text'
                placeholder='Write here'
                className='w-full text-2xl text-gray-800 border-none outline-none resize-none bg-inherit scrollbar-hide'
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              {openDropZone && (
                <DropZone
                  images={pathImages}
                  handleRemoveAll={handleRemoveAll}
                  handleRemoveFile={handleRemoveFile}
                  onDrop={onDrop}
                  handleCloseDropZone={handleCloseDropZone}
                ></DropZone>
              )}
            </div>
            <div className='flex items-center justify-between mt-2 text-gray-800'>
              <div className='flex items-center gap-3'>
                <button>
                  <CameraIcon></CameraIcon>
                </button>
                <button onClick={() => setOpenDropZone(!openDropZone)}>
                  <PhotoIcon className='w-6 h-6'></PhotoIcon>
                </button>
                <button>
                  <PaperClipIcon></PaperClipIcon>
                </button>
              </div>
              <FaceSmileIcon className='w-6 h-6'></FaceSmileIcon>
            </div>
            <button
              onClick={handleCreatePost}
              disabled={uploadMultiImagesMutation.isLoading || createPostMutation.isLoading}
              className='flex items-center justify-center w-full py-2 mt-3 text-sm font-semibold text-white bg-gray-600 rounded-md select-none h-9'
            >
              {uploadMultiImagesMutation.isLoading || createPostMutation.isLoading ? (
                <LoadingModal></LoadingModal>
              ) : (
                'Post'
              )}
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ModalPostCreator;
