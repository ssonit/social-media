import React, { FC } from 'react';
import CloseIcon from '../Icons/CloseIcon';
import CloudUpIcon from '../Icons/CloudUpIcon';
import { FileWithPath, useDropzone } from 'react-dropzone';

const DropZone: FC = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
    },
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <div key={file.path} className='relative h-36'>
      <img
        src={URL.createObjectURL(file)}
        alt=''
        className='object-cover w-full h-full rounded-sm'
      />
      <button className='absolute p-1.5 rounded-full bg-graySecondary/80 top-1 right-1'>
        <CloseIcon width='14' height='14'></CloseIcon>
      </button>
    </div>
  ));
  return (
    <div>
      {acceptedFiles.length === 0 ? (
        <div className='relative p-2 border rounded border-grayPrimary'>
          <div {...getRootProps({ className: 'dropzone' })}>
            <div className='rounded bg-[#f7f8fa] transition-all flex items-center justify-center relative cursor-pointer hover:bg-grayPrimary'>
              <div className='flex flex-col items-center py-10 select-none'>
                <CloudUpIcon></CloudUpIcon>
                <p className='font-semibold text-graySecondary'>Thêm ảnh/video</p>
                <p>hoặc kéo và thả</p>
              </div>
              <input className='hidden' type='file' {...getInputProps()} />
            </div>
          </div>
          <button className='absolute z-10 p-2 bg-white border rounded-full border-grayPrimary top-3 right-3'>
            <CloseIcon color='#262626'></CloseIcon>
          </button>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-3 gap-2 my-3'>{files}</div>
          <div className='flex items-center'>
            <button className='flex items-center gap-1 px-2 py-1 ml-auto transition-all ease-linear rounded bg-red-50 text-bluePrimary hover:bg-bluePrimary/10'>
              <CloudUpIcon className='w-6 h-6'></CloudUpIcon>
              <p className='text-sm font-semibold'>Thêm ảnh/video</p>
            </button>
            <button className='h-8 px-4 py-1 text-sm font-semibold transition-all ease-linear rounded bg-red-50 hover:bg-graySecondary/20'>
              Hủy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DropZone;
