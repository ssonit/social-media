import moment from 'moment';
import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '~/contexts/AppContext';
import { PostContext } from '~/contexts/PostContext';
import { IComment, IPostGenerate } from '~/types/post';
import Avatar from '../Common/Avatar';
import InputComment from '../Common/InputComment';
import OptionIcon from '../Icons/OptionIcon';
import CommentList from './CommentList';

interface IProps {
  comment?: IComment;
  children?: React.ReactNode;
  level: number;
  maxLevel: number;
}
const CommentCard: FC<IProps> = ({ comment, children, level, maxLevel }) => {
  const { postComment, getReplies } = useContext(PostContext);
  const { currentUser } = useContext(AppContext);
  const [showOption, setShowOption] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  const childComments = getReplies(comment?._id as string);
  console.log(childComments, 'child');

  const handleDeleteComment = () => {
    console.log(comment?._id);
  };

  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <Link className='self-start' to={`/`}>
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

                <div className='inline-flex gap-1'>
                  {comment?.reply && comment.tag && comment.tag._id !== comment.user._id ? (
                    <>
                      <p className='inline-block'>
                        {' '}
                        <Link
                          className='inline-block text-bluePrimary'
                          to={`/`}
                        >{`${comment.tag.username}`}</Link>{' '}
                        {comment?.content}
                      </p>
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
              <div className='relative flex-shrink-0'>
                <button
                  onClick={() => setShowOption(!showOption)}
                  className='inline-block p-0.5 rounded-full hover:bg-grayPrimary'
                >
                  <OptionIcon></OptionIcon>
                </button>
                {showOption && (
                  <div className='absolute z-30 w-56 p-1 translate-x-1/2 bg-white rounded-md shadow-lg top-full right-1/2'>
                    <button
                      onClick={() => setOnEdit(true)}
                      className='w-full px-2 rounded-md py-1.5 text-left hover:bg-grayPrimary'
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteComment}
                      className='w-full px-2 rounded-md py-1.5 text-left hover:bg-grayPrimary'
                    >
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

      {/* Nested comments */}

      {childComments && childComments?.length > 0 && (
        <div className={level < maxLevel ? 'ml-10' : ''}>
          <CommentList level={level + 1} maxLevel={maxLevel} comments={childComments}></CommentList>
        </div>
      )}

      {/* <div className={level < maxLevel ? 'ml-10' : ''}>
        {childComments &&
          childComments.map((item) => (
            <CommentCard
              key={item._id}
              level={level + 1}
              maxLevel={maxLevel}
              comment={item}
            ></CommentCard>
          ))}
      </div> */}

      {children}
    </div>
  );
};

export default CommentCard;
