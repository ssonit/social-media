import { FC } from 'react';
import { IFormGroupEdit } from '~/types/global';

const FormGroupEditTextarea: FC<IFormGroupEdit> = ({ label, value, name, id, handleChange }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='font-semibold'>
        {label}
      </label>
      <textarea
        value={value || ''}
        id={id}
        name={name}
        onChange={handleChange}
        className='px-2 py-1 border rounded border-grayPrimary focus:border-bluePrimary'
      ></textarea>
    </div>
  );
};

export default FormGroupEditTextarea;
