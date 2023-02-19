import moment from 'moment';
import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '~/contexts/AppContext';
import { PostContext } from '~/contexts/PostContext';
import { IComment, IPostGenerate } from '~/types/post';
import Avatar from '../Common/Avatar';
import InputComment from '../Common/InputComment';
import OptionIcon from '../Icons/OptionIcon';

interface IProps {
  comment?: IComment;
  children?: React.ReactNode;
}
const CommentCard: FC<IProps> = ({ comment, children }) => {
  const { postComment } = useContext(PostContext);
  const { currentUser } = useContext(AppContext);
  const [showOption, setShowOption] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  return (
    <div>
      <div className='flex gap-2 mb-2'>
        <Link to={`/`}>
          <Avatar size='small' url={comment?.user.avatar}></Avatar>
        </Link>
        {onEdit ? (
          <div className='flex-1'>
            <InputComment
              onEdit={onEdit}
              content={comment?.content}
              reply={comment?._id}
              post={postComment as IPostGenerate}
              setOnEdit={setOnEdit}
            ></InputComment>
            <button
              onClick={() => {
                setOnEdit(false);
                setShowOption(false);
              }}
              className='text-sm text-bluePrimary'
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className='flex flex-col h-full text-sm'>
              <div className='px-4 py-1.5 rounded-xl bg-grayPrimary'>
                <Link to={`/`}>
                  <h3 className='font-semibold'>{comment?.user.username || 'sonnguyen'}</h3>
                </Link>

                <div className='flex gap-1'>
                  {comment?.reply && comment.tag ? (
                    <>
                      <Link className='text-bluePrimary' to={`/`}>{`${comment.tag.username}`}</Link>
                      <p>{comment?.content}</p>
                    </>
                  ) : (
                    comment?.content || ''
                  )}
                </div>
              </div>
              <div className='flex items-center gap-4 ml-2 text-sm text-grayText'>
                <button>Like</button>
                <button onClick={() => setOnReply(!onReply)}>Reply</button>
                {comment?.createdAt && <span>{moment(comment?.createdAt).fromNow()}</span>}
              </div>
            </div>
            {currentUser?._id === comment?.user._id && (
              <div className='relative'>
                <button
                  onClick={() => setShowOption(!showOption)}
                  className='inline-block mt-4 p-0.5 rounded-full hover:bg-grayPrimary'
                >
                  <OptionIcon></OptionIcon>
                </button>
                {showOption && (
                  <div className='absolute z-30 w-56 p-1 translate-x-1/2 bg-white rounded-md shadow-lg top-2/3 right-1/2'>
                    <button
                      onClick={() => setOnEdit(true)}
                      className='w-full px-2 rounded-md py-1.5 text-left hover:bg-grayPrimary'
                    >
                      Edit
                    </button>
                    <button className='w-full px-2 rounded-md py-1.5 text-left hover:bg-grayPrimary'>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {onReply && (
        <div className='flex gap-1 mb-5 ml-10'>
          <Avatar size='small' url={currentUser?.avatar}></Avatar>
          <div className='flex-1'>
            <InputComment
              post={postComment as IPostGenerate}
              reply={comment?._id}
              tag={comment?.user}
              setOnReply={setOnReply}
            ></InputComment>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
