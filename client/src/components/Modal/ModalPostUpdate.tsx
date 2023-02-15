import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '~/contexts/AppContext';
import { PostContext } from '~/contexts/PostContext';
import ModalLayout from '~/layouts/ModalLayout';
import postApi from '~/services/post';
import uploadApi from '~/services/upload';
import { IPropsModal } from '~/types/global';
import { uploadKey } from '~/utils/constants';
import Avatar from '../Common/Avatar';
import DropZone from '../Common/DropZone';
import LoadingModal from '../Common/LoadingModal';
import CameraIcon from '../Icons/CameraIcon';
import CloseIcon from '../Icons/CloseIcon';
import FaceSmileIcon from '../Icons/FaceSmileIcon';
import PaperClipIcon from '../Icons/PaperClipIcon';
import PhotoIcon from '../Icons/PhotoIcon';

const ModalPostUpdate: FC<IPropsModal> = ({ handleCloseModal, openModal }) => {
  const [text, setText] = useState('');
  const [openDropZone, setOpenDropZone] = useState<boolean>(true);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [pathImages, setPathImages] = useState<string[]>([]);

  const localImages = useMemo(
    () => fileImages.map((file) => URL.createObjectURL(file)),
    [fileImages],
  );

  const { currentUser } = useContext(AppContext);
  const { postData, status } = useContext(PostContext);

  const queryClient = useQueryClient();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFileImages([...fileImages, ...acceptedFiles]);
    },
    [fileImages],
  );
  useEffect(() => {
    if (Boolean(postData) && status) {
      setText(postData?.description as string);
      setPathImages(postData?.images as string[]);
    }
  }, [postData, status, openModal]);

  const handleCloseDropZone = () => {
    setOpenDropZone(false);
  };

  const handleRemoveFile = (index: number) => {
    const pathImagesLength = pathImages.length;
    if (index < pathImagesLength) {
      const newPathImages = [...pathImages];
      newPathImages.splice(index, 1);
      setPathImages(newPathImages);
    } else if (index >= pathImagesLength) {
      const newFileImages = [...fileImages];
      newFileImages.splice(index - pathImagesLength, 1);
      setFileImages(newFileImages);
    }
  };

  const handleRemoveAll = () => {
    setFileImages([]);
    setPathImages([]);
  };

  const uploadMultiImagesMutation = useMutation({
    mutationFn: (body: FormData) => uploadApi.uploadMultiImages(body),
  });
  const updatePostMutation = useMutation({
    mutationFn: (body: { description: string; images: string[]; postId: string }) =>
      postApi.updatePost(body.description, body.images, body.postId),
  });

  const handleUpdatePost = async () => {
    const images = [...pathImages];
    if (text) {
      if (fileImages.length > 0) {
        const formData = new FormData();

        fileImages.forEach((file) => {
          formData.append(uploadKey.IMAGES, file);
        });

        const uploadData = await uploadMultiImagesMutation.mutateAsync(formData);

        images.push(...uploadData.data.data);
      }
      if (images.length > 0) {
        const updatedData = await updatePostMutation.mutateAsync({
          description: text,
          images,
          postId: postData?._id as string,
        });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        console.log(updatedData);
      }
      handleCloseModal();
    }
  };

  return (
    <ModalLayout handleCloseModal={handleCloseModal} openModal={openModal}>
      <div className='flex h-auto py-1 mx-auto transition-all bg-white border border-gray-700 rounded-lg '>
        <div className={`page-1 max-w-lg w-[320px] md:w-[400px] lg:w-[460px]`}>
          <div className='relative flex items-center justify-center px-3 py-3 border-b border-grayPrimary'>
            <h2 className='text-xl font-bold text-center text-gray-800'>Update Post</h2>
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
                  images={[...pathImages, ...localImages]}
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
                  <PhotoIcon></PhotoIcon>
                </button>
                <button>
                  <PaperClipIcon></PaperClipIcon>
                </button>
              </div>
              <FaceSmileIcon></FaceSmileIcon>
            </div>
            <button
              onClick={handleUpdatePost}
              disabled={updatePostMutation.isLoading || uploadMultiImagesMutation.isLoading}
              className='flex items-center justify-center w-full py-2 mt-3 text-sm font-semibold text-white bg-gray-600 rounded-md select-none h-9'
            >
              {uploadMultiImagesMutation.isLoading || updatePostMutation.isLoading ? (
                <LoadingModal></LoadingModal>
              ) : (
                'Update Post'
              )}
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ModalPostUpdate;
