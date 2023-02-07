import { FC, HTMLInputTypeAttribute, ReactNode } from 'react';
import { type UseFormRegister } from 'react-hook-form';

interface IProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  name: 'email' | 'password' | 'fullname' | 'username';
  children?: ReactNode;
  register: UseFormRegister<any>;
}

const InputForm: FC<IProps> = ({ type, placeholder, register, className = '', name, children }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        className='w-full p-2 text-xs border rounded focus:border-transparent focus:bg-transparent text-graySecondary border-grayPrimary'
        {...register(name)}
        placeholder={placeholder}
      />
      {children}
      {/* <div className='my-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div> */}
    </div>
  );
};

export default InputForm;
