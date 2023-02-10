import React, { FC, useRef } from 'react';
import CloseIcon from '../Icons/CloseIcon';

interface IProps {
  file: File;
  handleRemoveFile: (file: File) => void;
}
const DropImage: FC<IProps> = ({ file, handleRemoveFile }) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative h-36 add-zoom`} ref={divRef}>
      <img
        src={URL.createObjectURL(file)}
        alt=''
        className='object-cover w-full h-full rounded-sm'
      />
      <button
        onClick={() => {
          handleRemoveFile(file);
        }}
        className={`absolute p-1.5 rounded-full bg-graySecondary/80 top-1 right-1`}
      >
        <CloseIcon width='14' height='14'></CloseIcon>
      </button>
    </div>
  );
};

export default DropImage;
