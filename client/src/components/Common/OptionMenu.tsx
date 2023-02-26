import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import OptionIcon from '../Icons/OptionIcon';
import { IPropsIcon } from '~/types/global';
import SaveButton from '../Home/SaveButton';
import RemoveButton from '../Home/RemoveButton';
import { IPostGenerate } from '~/types/post';

interface IProps {
  post: IPostGenerate;
  handleStatusEdit: () => void;
  children?: React.ReactNode;
}

const OptionMenu: FC<IProps> = ({ handleStatusEdit, post }) => {
  return (
    <div>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex justify-center w-full p-1 text-sm font-medium text-white transition-all rounded-full bg-opacity-20 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-grayPrimary'>
            <OptionIcon></OptionIcon>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1'>
              <Menu.Item>
                <button
                  onClick={handleStatusEdit}
                  className={`text-gray-900 hover:bg-bluePrimary transition-all group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <EditInactiveIcon className='w-5 h-5 mr-2' aria-hidden='true' />
                  Edit
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className={`text-gray-900 hover:bg-bluePrimary group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <DuplicateInactiveIcon className='w-5 h-5 mr-2' aria-hidden='true' />
                  Duplicate
                </button>
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                <SaveButton postId={post._id} className='w-full' classNameIcon='w-5 h-5 mr-2'>
                  Saved
                </SaveButton>
              </Menu.Item>
              <Menu.Item>
                <button
                  className={`text-gray-900 group hover:bg-bluePrimary flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <MoveInactiveIcon className='w-5 h-5 mr-2' aria-hidden='true' />
                  Move
                </button>
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                <RemoveButton
                  postId={post._id}
                  commentsId={post.comments.map((item) => item._id)}
                  userId={post.userId._id}
                ></RemoveButton>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export function EditInactiveIcon({ color = '#262626', className }: IPropsIcon) {
  return (
    <svg className={className} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 13V16H7L16 7L13 4L4 13Z' stroke={color} strokeWidth='2' />
    </svg>
  );
}

export function DuplicateInactiveIcon({ color = '#262626', className }: IPropsIcon) {
  return (
    <svg className={className} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 4H12V12H4V4Z' stroke={color} strokeWidth='2' />
      <path d='M8 8H16V16H8V8Z' stroke={color} strokeWidth='2' />
    </svg>
  );
}

export function MoveInactiveIcon({ color = '#262626', className }: IPropsIcon) {
  return (
    <svg className={className} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M10 4H16V10' stroke={color} strokeWidth='2' />
      <path d='M16 4L8 12' stroke={color} strokeWidth='2' />
      <path d='M8 6H4V16H14V12' stroke={color} strokeWidth='2' />
    </svg>
  );
}

export function DeleteInactiveIcon({ color = '#262626', className }: IPropsIcon) {
  return (
    <svg className={className} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='5' y='6' width='10' height='10' stroke={color} strokeWidth='2' />
      <path d='M3 6H17' stroke={color} strokeWidth='2' />
      <path d='M8 6V4H12V6' stroke={color} strokeWidth='2' />
    </svg>
  );
}

export default OptionMenu;
