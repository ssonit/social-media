import { FC } from 'react';
import { Link } from 'react-router-dom';
import ChevronLeft from '../Icons/ChevronLeft';

interface IPropsHeading {
  content: string;
}
const Heading: FC<IPropsHeading> = ({ content }) => {
  return (
    <div className='fixed top-0 left-0 z-50 w-full bg-white'>
      <div className='flex items-center justify-between px-4 border-b md:hidden h-11 border-grayPrimary'>
        <Link to='/'>
          <ChevronLeft></ChevronLeft>
        </Link>
        <span className='inline-block font-semibold -translate-x-3 text-graySecondary'>
          {content}
        </span>
        <div></div>
      </div>
    </div>
  );
};

export default Heading;
