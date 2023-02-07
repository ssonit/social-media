import { FC, HTMLInputTypeAttribute, useState } from 'react';
import IconEyeToggle from '../Icons/IconEyeToggle';
import { type UseFormRegister } from 'react-hook-form';
import InputForm from './InputForm';

interface IProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  name: 'email' | 'password' | 'fullname' | 'username';
  register: UseFormRegister<any>;
}
const InputFormPassword: FC<IProps> = ({ type, placeholder, register, className = '', name }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <InputForm
      register={register}
      name={name}
      className={className}
      placeholder={placeholder}
      type={showPass ? 'text' : type}
    >
      <button
        type='button'
        onClick={() => setShowPass(!showPass)}
        className='absolute -translate-y-1/2 cursor-pointer right-2 top-1/2'
      >
        <IconEyeToggle showPass={showPass}></IconEyeToggle>
      </button>
    </InputForm>
  );
};

export default InputFormPassword;
