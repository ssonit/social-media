import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useContext, useEffect } from 'react';
import { AppContext } from '~/contexts/AppContext';
import postApi from '~/services/post';
import PostItem from './PostItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostContext } from '~/contexts/PostContext';
import { IPostGenerate } from '~/types/post';
import Spinner from '../Common/Spinner';
import ModalComment from '../Modal/ModalComment';
import { ModalType } from '~/utils/constants';
import { ModalContext } from '~/contexts/ModalContext';

const LIMIT = 3;

const PostList: FC = () => {
  const { isAuthenticated } = useContext(AppContext);
  const { setPostList, postList, postComment } = useContext(PostContext);
  const { handleCloseModal, modalOpenList } = useContext(ModalContext);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => postApi.getPostList(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.data.length >= LIMIT) {
        const nextPage = allPages.length + 1;
        return nextPage;
      }
      return undefined;
    },
    enabled: !!isAuthenticated,
  });

  useEffect(() => {
    if ((data?.pages.length as number) > 0) {
      const posts = data?.pages.reduce<IPostGenerate[]>((value, page) => {
        return [...value, ...page.data.data];
      }, []);
      if (posts) {
        setPostList(posts);
      }
    }
  }, [data?.pages, setPostList]);
  return (
    <>
      <InfiniteScroll
        dataLength={data?.pages.flatMap((p) => p.data).length || 0}
        next={() => fetchNextPage()}
        hasMore={(hasNextPage as boolean) || false}
        loader={
          <div className='flex items-center justify-center mb-4'>
            <Spinner></Spinner>
          </div>
        }
        endMessage={
          <p style={{ textAlign: 'center', marginBottom: '10px' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className='scrollbar-hide'
      >
        <section>
          {postList
            ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((item) => (
              <PostItem {...item} key={item._id}></PostItem>
            ))}
        </section>
      </InfiniteScroll>
      {postComment && (
        <ModalComment
          openModal={modalOpenList.includes(ModalType.POST_COMMENT)}
          handleCloseModal={() => handleCloseModal(ModalType.POST_COMMENT)}
        ></ModalComment>
      )}
    </>
  );
};

export default PostList;
