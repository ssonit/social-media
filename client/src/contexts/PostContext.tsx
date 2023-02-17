import { createContext, useState } from 'react';
import { IPostGenerate } from '~/types/post';

interface PostContextInterface {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  postData: IPostGenerate | null;
  setPostData: React.Dispatch<React.SetStateAction<IPostGenerate | null>>;
  postList: IPostGenerate[] | null;
  setPostList: React.Dispatch<React.SetStateAction<IPostGenerate[] | null>>;
  postComment: IPostGenerate | null;
  setPostComment: React.Dispatch<React.SetStateAction<IPostGenerate | null>>;
}

const initialPostContext: PostContextInterface = {
  status: false,
  setStatus: () => null,
  postData: null,
  setPostData: () => null,
  postList: null,
  setPostList: () => null,
  postComment: null,
  setPostComment: () => null,
};

export const PostContext = createContext<PostContextInterface>(initialPostContext);

export const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState(initialPostContext.status);
  const [postData, setPostData] = useState(initialPostContext.postData);
  const [postList, setPostList] = useState(initialPostContext.postList);
  const [postComment, setPostComment] = useState(initialPostContext.postComment);
  return (
    <PostContext.Provider
      value={{
        status,
        postData,
        setPostData,
        setStatus,
        postList,
        setPostList,
        postComment,
        setPostComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
