import React, { FC, useState } from 'react';
import SearchIcon from '../Icons/SearchIcon';
import XCircleIcon from '../Icons/XCircleIcon';
import LoadIcon from '../../assets/loading.gif';
import { useQuery } from '@tanstack/react-query';
import userApi from '~/services/user';
import { getPathImage } from '~/utils/constants';
import { Link } from 'react-router-dom';
import useDebounce from '~/hooks/useDebounce';

const Search: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 800);

  const { data, isLoading } = useQuery({
    queryKey: ['searchUser', [debouncedValue, searchValue]],
    queryFn: () => userApi.searchUser(debouncedValue),
    enabled: !!debouncedValue && !!searchValue,
  });

  return (
    <div className='w-[300px] shadow-lg h-full bg-white py-10'>
      <div className='px-2 rounded-md'>
        <div className='relative'>
          <input
            type='text'
            className='w-full focus:border-transparent border-2 border-grayPrimary px-1 py-2 text-sm appearance-none h-[30px] rounded-md'
            placeholder=''
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div
            className={`absolute flex items-center justify-center -translate-y-1/2 cursor-pointer right-1 top-1/2 transition-all duration-100 ${
              !searchValue ? 'opacity-0 invisible' : 'opacity-100 visible'
            }`}
          >
            {isLoading ? (
              <img src={LoadIcon} alt='load-icon' className='w-4 h-4' />
            ) : (
              <button onClick={() => setSearchValue('')}>
                <XCircleIcon></XCircleIcon>
              </button>
            )}
          </div>
          <div
            className={`absolute flex items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2 transition-all duration-100 ${
              searchValue ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className='w-6 h-6 p-1'>
              <SearchIcon></SearchIcon>
            </div>
            <span className='text-sm text-grayText'>Tìm kiếm</span>
          </div>
        </div>
      </div>

      <div className='w-full max-h-full overflow-y-auto bg-white scrollbar-hide top-full'>
        <ul>
          {searchValue &&
            data?.data.data.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/profile/${item._id}`}
                  className='flex items-center w-full gap-3 px-4 py-2 transition-all hover:bg-bgColorPrimary'
                >
                  <div className='w-11 h-11'>
                    <img
                      src={
                        getPathImage(item.avatar) ||
                        'https://vaithuhayho.com/wp-content/uploads/2022/09/anh-gai-xinh-deo-kinh-35.jpg'
                      }
                      alt='img'
                      className='object-cover w-full h-full rounded-full'
                    />
                  </div>
                  <div className='flex flex-col items-start flex-1'>
                    <h3 className='text-sm font-semibold text-graySecondary'>{item.username}</h3>
                    <span className='text-sm text-grayText'>{item.fullname}</span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
