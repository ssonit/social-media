import React, { FC } from 'react';

const InputComment: FC = () => {
  return (
    <div className='flex items-center px-4 border-t bg-grayPrimary/40 border-grayPrimary'>
      <textarea
        name='comment'
        id='comment'
        rows={1}
        className='flex-1 py-2 pl-0.5 placeholder:font-medium outline-none resize-none scrollbar-hide bg-transparent'
        placeholder='Write a comment'
      ></textarea>
      <button className='text-sm font-semibold text-bluePrimary'>Post</button>
    </div>
  );
};

export default InputComment;
