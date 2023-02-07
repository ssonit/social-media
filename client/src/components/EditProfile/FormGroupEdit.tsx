import { FC } from 'react';
import { IFormGroupEdit } from '~/types/global';

const FormGroupEdit: FC<IFormGroupEdit> = ({ label, value, name, id, handleChange }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='font-semibold'>
        {label}
      </label>
      <input
        type='text'
        value={value || ''}
        id={id}
        name={name}
        className='px-2 py-1 border rounded border-grayPrimary focus:border-bluePrimary'
        onChange={handleChange}
      />
    </div>
  );
};

export default FormGroupEdit;
