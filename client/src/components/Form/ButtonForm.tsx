import { FC } from 'react';
import Spinner from '../Common/Spinner';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const ButtonForm: FC<ButtonProps> = ({ type = 'button', isLoading, children, ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className='flex items-center justify-center w-full h-8 px-2 py-1 text-sm font-semibold text-white rounded select-none bg-bluePrimary'
    >
      {isLoading ? <Spinner></Spinner> : children}
    </button>
  );
};

export default ButtonForm;
