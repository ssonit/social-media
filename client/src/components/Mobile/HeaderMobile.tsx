import { FC } from 'react';
import ChevronDown from '../Icons/ChevronDown';
import DiscoverIcon from '../Icons/DiscoverIcon';
import SettingIcon from '../Icons/SettingIcon';

interface IProps {
  username?: string;
}
const HeaderMobile: FC<IProps> = ({ username = '' }) => {
  return (
    <section className='flex items-center justify-between px-4 py-3 border-b h-11 border-grayPrimary md:hidden'>
      <SettingIcon></SettingIcon>
      <div className='flex items-center'>
        <h3 className='font-semibold text-graySecondary'>{username}</h3>
        <ChevronDown></ChevronDown>
      </div>
      <DiscoverIcon></DiscoverIcon>
    </section>
  );
};

export default HeaderMobile;
