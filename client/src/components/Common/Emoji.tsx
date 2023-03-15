import React, { FC, lazy, useState, Suspense } from 'react';
import FaceSmileIcon from '../Icons/FaceSmileIcon';
import { motion } from 'framer-motion';
import { EmojiStyle } from 'emoji-picker-react/dist';

interface IProps {
  handleChangeMessage: (value: string) => void;
}

const EmojiPicker = lazy(() => import('emoji-picker-react'));

const Emoji: FC<IProps> = ({ handleChangeMessage }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  return (
    <div className='relative flex flex-col'>
      <button onClick={handleShowEmoji} type='button'>
        <FaceSmileIcon className='w-5 h-5' color='#262626'></FaceSmileIcon>
      </button>
      <Suspense>
        {showEmoji && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transformOrigin: 'bottom right' }}
            exit={{ opacity: 0, scale: 0 }}
            className='absolute right-0 bottom-8'
          >
            <EmojiPicker
              onEmojiClick={(emoji) => {
                handleChangeMessage(emoji.emoji);
              }}
              lazyLoadEmojis={true}
              emojiStyle={EmojiStyle.FACEBOOK}
            ></EmojiPicker>
          </motion.div>
        )}
      </Suspense>
    </div>
  );
};

export default Emoji;
