import { createContext, useMemo, useState } from 'react';
import { IComment, IPostGenerate } from '~/types/post';

interface PostContextInterface {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  postData: IPostGenerate | null;
  setPostData: React.Dispatch<React.SetStateAction<IPostGenerate | null>>;
  postList: IPostGenerate[] | null;
  setPostList: React.Dispatch<React.SetStateAction<IPostGenerate[] | null>>;
  postComment: IPostGenerate | null;
  postCommentId: string | null;
  setPostCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  rootComments: IComment[];
  getReplies: (parentId: string) => IComment[];
}

const initialPostContext: PostContextInterface = {
  status: false,
  setStatus: () => null,
  postData: null,
  setPostData: () => null,
  postList: null,
  setPostList: () => null,
  postComment: null,
  postCommentId: null,
  setPostCommentId: () => null,
  rootComments: [],
  getReplies: () => [],
};

export const PostContext = createContext<PostContextInterface>(initialPostContext);

export const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState(initialPostContext.status);
  const [postData, setPostData] = useState(initialPostContext.postData);
  const [postList, setPostList] = useState(initialPostContext.postList);
  const [postCommentId, setPostCommentId] = useState(initialPostContext.postCommentId);

  // const { data } = useQuery({
  //   queryKey: ['post', postComment?._id],
  //   queryFn: () => postApi.getPost(postComment?._id as string),
  //   enabled: !!postComment?._id,
  //   staleTime: 0,
  // });

  // useEffect(() => {
  //   if (data && postComment) {
  //     const newPostComment = {
  //       ...postComment,
  //       likes: data.data.data.likes,
  //       comments: data.data.data.comments,
  //     };
  //     setPostComment(newPostComment);
  //   }
  // }, [data]);

  const postComment = useMemo(() => {
    return postList?.find((item) => item._id === postCommentId) || null;
  }, [postCommentId, postList]);

  const commentsByParentId = useMemo(() => {
    const group: { [k: string]: IComment[] } = {};
    postComment?.comments.forEach((comment) => {
      group[comment?.reply as string] ||= [];
      group[comment?.reply as string].push(comment);
    });
    return group;
  }, [postComment?.comments]);

  function getReplies(parentId: string) {
    return commentsByParentId[parentId];
  }

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
        postCommentId,
        setPostCommentId,
        rootComments: commentsByParentId['undefined'],
        getReplies,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
