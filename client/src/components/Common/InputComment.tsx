import { useMutation } from '@tanstack/react-query';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { PostContext } from '~/contexts/PostContext';
import commentApi from '~/services/comment';
import { ICommentCreate, IPostGenerate } from '~/types/post';
import { IUserShort } from '~/types/user';
import PaperAirplaneIcon from '../Icons/PaperAirplaneIcon';

interface IProps {
  post: IPostGenerate;
  reply?: string;
  tag?: IUserShort;
  onEdit?: boolean;
  content?: string;
  setOnReply?: React.Dispatch<React.SetStateAction<boolean>>;
  setOnEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}
const InputComment: FC<IProps> = ({ post, reply, tag, setOnReply, onEdit, content, setOnEdit }) => {
  const [commentContent, setCommentContent] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { postList, setPostList } = useContext(PostContext);

  const createCommentMutation = useMutation({
    mutationFn: (body: ICommentCreate) => commentApi.createComment(body),
  });
  const updateCommentMutation = useMutation({
    mutationFn: (body: { content: string; commentId: string }) => commentApi.updateComment(body),
  });

  useEffect(() => {
    textAreaRef.current?.focus();
    if (onEdit) {
      setCommentContent(content as string);
    }
  }, [content, onEdit]);

  const handleChange = () => {
    setCommentContent(textAreaRef.current?.value as string);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '40px';
      textAreaRef.current.style.height = `${textAreaRef.current?.scrollHeight}px`;
    }
  };

  const handleCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onEdit) {
      const newComments = post.comments.map((comment) => {
        if (comment._id === reply) {
          return {
            ...comment,
            content: commentContent,
          };
        }
        return comment;
      });
      const newPostList = postList?.map((item) => {
        if (item._id === post._id) {
          return { ...item, comments: newComments };
        }
        return item;
      });

      const data = await updateCommentMutation.mutateAsync({
        commentId: reply as string,
        content: commentContent,
      });
      if (data.status === 200) {
        setPostList(newPostList as IPostGenerate[]);
        if (setOnEdit) setOnEdit(false);
      }
    } else {
      const newComment = {
        content: commentContent,
        postId: post._id,
        reply: reply,
        tag: tag,
        postUserId: post.userId._id,
      };
      console.log(newComment);
      const data = await createCommentMutation.mutateAsync(newComment);
      if (data.status === 200) {
        const newPostList = postList?.map((item) => {
          if (item._id === post._id) {
            return { ...item, comments: [...post.comments, data.data.data] };
          }
          return item;
        });
        setPostList(newPostList as IPostGenerate[]);
      }
      setCommentContent('');
      if (setOnReply) {
        setOnReply(false);
      }
    }
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '40px';
    }
  };

  return (
    <form
      onSubmit={handleCreateComment}
      className={`flex items-center px-4 border-t bg-grayPrimary border-grayPrimary ${
        reply || onEdit ? 'rounded-md' : 'rounded-b-md'
      }`}
    >
      <textarea
        name='comment'
        id='comment'
        className='flex-1 py-2 pl-0.5 pr-2 h-10 max-h-52 placeholder:text-grayText  placeholder:font-medium outline-none resize-none scrollbar-hide bg-transparent'
        placeholder={reply ? `Reply ${tag?.username}` : 'Write a comment'}
        value={commentContent}
        onChange={handleChange}
        ref={textAreaRef}
      ></textarea>
      <button type='submit' className='text-sm font-semibold text-bluePrimary'>
        <PaperAirplaneIcon width='24' height='24'></PaperAirplaneIcon>
      </button>
    </form>
  );
};

export default InputComment;
