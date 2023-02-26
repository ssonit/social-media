import React, { FC } from 'react';
import { IPropsIcon } from '~/types/global';

const EditButton: FC = () => {
  return (
    <button
      className={`text-gray-900 hover:bg-bluePrimary transition-all group flex w-full items-center rounded-md px-2 py-2 text-sm`}
    >
      <EditInactiveIcon className='w-5 h-5 mr-2' aria-hidden='true' />
      Edit
    </button>
  );
};
function EditInactiveIcon({ color = '#262626', className }: IPropsIcon) {
  return (
    <svg className={className} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 13V16H7L16 7L13 4L4 13Z' stroke={color} strokeWidth='2' />
    </svg>
  );
}
export default EditButton;
