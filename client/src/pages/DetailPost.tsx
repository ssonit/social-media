import { useQuery } from '@tanstack/react-query';
import React, { FC, useContext } from 'react';
import PostItem from '~/components/Home/PostItem';
import ModalComment from '~/components/Modal/ModalComment';
import { ModalContext } from '~/contexts/ModalContext';
import useQueryParams from '~/hooks/useQueryParams';
import MainLayout from '~/layouts/MainLayout';
import postApi from '~/services/post';
import { ModalType } from '~/utils/constants';

const DetailPost: FC = () => {
  const { handleCloseModal, modalOpenList } = useContext(ModalContext);
  const { id } = useQueryParams();
  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postApi.getPost(id),
    enabled: !!id,
  });

  return (
    <MainLayout>
      <div className='max-w-lg mx-auto mt-2 pb-14'>
        {data && <PostItem {...data?.data.data}></PostItem>}
      </div>
      {data?.data.data.comments && (
        <ModalComment
          openModal={modalOpenList.includes(ModalType.POST_COMMENT)}
          handleCloseModal={() => handleCloseModal(ModalType.POST_COMMENT)}
        ></ModalComment>
      )}
    </MainLayout>
  );
};

export default DetailPost;
